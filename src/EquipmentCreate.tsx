import React from "react";
import axios from "axios";

import { baseUrl } from "./App";
import * as Types from "./types";

type EquipmentCreateProps = {
  refreshEquipment: () => void;
};

type EquipmentCreateState = {
  equipmentNumber: string;
  address: string;
  contractStartDate: string;
  contractEndDate: string;
  status: "RUNNING" | "STOPPED";
};

export class EquipmentCreate extends React.PureComponent<
  EquipmentCreateProps,
  EquipmentCreateState
> {
  constructor(props: EquipmentCreateProps) {
    super(props);
    this.state = {
      equipmentNumber: "",
      address: "",
      contractStartDate: "",
      contractEndDate: "",
      status: "RUNNING",
    };
  }

  updateEquipmentNumber = (value: string) => {
    this.setState({
      equipmentNumber: value,
    });
  };

  updateAddress = (value: string) => {
    this.setState({
      address: value,
    });
  };

  updateContractStartDate = (value: string) => {
    this.setState({
      contractStartDate: value,
    });
  };
  updateContractEndDate = (value: string) => {
    this.setState({
      contractEndDate: value,
    });
  };

  updateStatus = (checked: Boolean) => {
    this.setState({
      status: checked ? "RUNNING" : "STOPPED",
    });
  };

  onClickSubmit = async () => {
    const payload: Types.EquipmentDTO = {
      equipmentNumber: this.state.equipmentNumber,
      address: this.state.address,
      contractStartDate: this.state.contractStartDate,
      contractEndDate: this.state.contractEndDate,
      status: this.state.status,
    };

    console.log(payload);

    const result = await axios.post(`${baseUrl}`, payload);

    console.log(result);

    // trigger refresh
    this.props.refreshEquipment();
  };

  render() {
    return (
      <div className="create-equipment">
        <h2>Create new equipment</h2>
        <div className="create-equipment-container">
          <label htmlFor="id" className="create-label">
            Equipment Number (Unique Identifier)
          </label>
          <input
            id="id"
            onChange={(event) => this.updateEquipmentNumber(event.target.value)}
            required
            type="text"
            className="create-input"
          />
          <label htmlFor="address" className="create-label">
            Address
          </label>
          <input
            id="address"
            onChange={(event) => this.updateAddress(event.target.value)}
            required
            type="text"
            className="create-input"
          />
          <label htmlFor="start" className="create-label">
            Contract Start Date
          </label>
          <input
            type="date"
            id="start"
            onChange={(event) =>
              this.updateContractStartDate(event.target.value)
            }
            required
            className="create-input"
          />
          <label htmlFor="end" className="create-label">
            Contract End Date
          </label>
          <input
            type="date"
            id="end"
            onChange={(event) => this.updateContractEndDate(event.target.value)}
            required
            className="create-input"
          />
          <label htmlFor="status" className="create-label">
            Running
          </label>
          <input
            id="status"
            onChange={(event) => this.updateStatus(event.target.checked)}
            required
            type="checkbox"
            className="create-input"
          />
        </div>
        <button className="create-button" onClick={this.onClickSubmit}>
          Create
        </button>
      </div>
    );
  }
}
