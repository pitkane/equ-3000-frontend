export interface EquipmentDTO {
  equipmentNumber: string;
  address: string;
  contractStartDate: string;
  contractEndDate: string;
  status: "RUNNING" | "STOPPED";
}
