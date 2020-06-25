import React from "react";

import * as Types from "./types";

type EquipmentListProps = {
  equipmentList: Types.EquipmentDTO[];
};

export const EquipmentList = ({ equipmentList }: EquipmentListProps) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Address</th>
          <th>Contract start</th>
          <th>Contract End</th>
          <th>Contract Status</th>
        </tr>
      </thead>
      <tbody id="equipments">
        {equipmentList.map((equipment: Types.EquipmentDTO) => (
          <tr key={`equipment-${equipment.equipmentNumber}`}>
            <td>{equipment.equipmentNumber}</td>
            <td>{equipment.address}</td>
            <td>{equipment.contractStartDate}</td>
            <td>{equipment.contractEndDate}</td>
            <td>{equipment.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
