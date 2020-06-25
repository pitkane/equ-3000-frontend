import React from "react";
import axios from "axios";
import moment from "moment";
import { v4 } from "uuid";
import _ from "lodash";

import "./App.css";
import { EquipmentCreate } from "./EquipmentCreate";
import { EquipmentList } from "./EquipmentList";
import * as Types from "./types";

export const baseUrl = `http://equ-3000-api.eba-k3g67aim.eu-west-1.elasticbeanstalk.com/api/equipment`;

interface AppState {
  equipmentList: Types.EquipmentDTO[];
  limitList: number;
}

export class App extends React.PureComponent<{}, AppState> {
  state = {
    equipmentList: [],
    limitList: 50,
  };

  refreshEquipment = async (limit?: number) => {
    console.log(`REFRESH: ${this.state.limitList}`);

    const fetchWithLimit = limit ? limit : this.state.limitList;

    const result = await axios.get(`${baseUrl}/search?limit=${fetchWithLimit}`);

    this.setState({ equipmentList: result.data as Types.EquipmentDTO[] });
  };

  async clearEquipment() {
    await axios.delete(`${baseUrl}`);
    await this.refreshEquipment();
  }

  populateTestData = async () => {
    for (const iterator of [1, 2, 3, 4, 5]) {
      await axios.post(`${baseUrl}`, {
        equipmentNumber: v4(),
        address: `Test street ${_.random(0, 100)}`,
        contractStartDate: `${moment()
          .subtract(_.random(0, 100), "days")
          .format("YYYY-MM-DD")}`,
        contractEndDate: `${moment()
          .add(_.random(0, 100), "days")
          .format("YYYY-MM-DD")}`,
        status: `${_.random(0, 1) ? "RUNNING" : "STOPPED"}`,
      });
    }

    this.refreshEquipment();
  };

  componentDidMount() {
    this.refreshEquipment();
  }

  updateLimit = async (newLimit: string) => {
    const limit = _.toNumber(newLimit);

    this.setState({ limitList: limit });

    this.refreshEquipment(limit);
  };

  render() {
    return (
      <div className="App">
        <header className="App-container">
          <div>
            <button onClick={() => this.clearEquipment()}>
              Clear equipment
            </button>
            <button onClick={() => this.populateTestData()}>
              Populate Test Data
            </button>
          </div>
          <br />
          <div>
            <label htmlFor="status" className="create-label">
              Limit the list below:
            </label>
            <input
              type="number"
              id="limit"
              placeholder="number..."
              onChange={(event) => this.updateLimit(event.target.value)}
              required
              className="create-input"
            />
          </div>
          <EquipmentList equipmentList={this.state.equipmentList} />
          <EquipmentCreate refreshEquipment={() => this.refreshEquipment()} />
        </header>
      </div>
    );
  }
}
