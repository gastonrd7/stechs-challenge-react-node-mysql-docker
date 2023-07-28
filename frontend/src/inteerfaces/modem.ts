export interface IModemItem {
  modem_macaddr: string;
  ipaddr: string;
  vsi_model: string;
  vsi_vendor: string;
  vsi_swver: string;
}

export interface IModemItemToAddInJson {
  vendor: string;
  name: string;
  soft: string;
}