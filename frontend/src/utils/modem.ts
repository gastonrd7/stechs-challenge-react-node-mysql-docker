import { IModemItem, IModemItemToAddInJson } from "../inteerfaces/modem";

export const  getUniqueObjectsByProperties = (arr: IModemItemToAddInJson[], props: (keyof IModemItemToAddInJson)[]): IModemItemToAddInJson[] => {
  const uniqueSet = new Set();

  return arr.filter((obj) => {
    const key = props.map((prop) => obj[prop]).join('-');
    return !uniqueSet.has(key) && uniqueSet.add(key);
  });
}

export const mapImodemItemToIModemItemToAddInJson = (items: IModemItem[]): IModemItemToAddInJson[] => {
  return items.map((item) => ({
      vendor: item.vsi_vendor,
      name: item.vsi_model,
      soft: item.vsi_swver
    }));
}

export const parsedStringsToObjects = (selectionModel: any[]): IModemItem[] => {
  return selectionModel.map((objectStr, index) => {
      const item: IModemItem = JSON.parse(objectStr.trim());
      return item;
    });
}