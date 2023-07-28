import { query } from '../database/connector';
import { IModems, IModemsJSON } from '../interfaces/modems';
import fs from 'fs';

export const querySelectModems = async (vendor: string): Promise<any[]> => {
  const lowercaseSearchName = vendor.toLowerCase();
  const sql = `SELECT modem_macaddr, ipaddr, vsi_model, vsi_vendor, vsi_swver FROM docsis_update where LOWER(vsi_vendor) = '${lowercaseSearchName}'`;
  const resultQuery = await query(sql);
  return resultQuery;
}

export const readJSONFile = (filePath: string): Promise<IModemsJSON> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data) as IModemsJSON;
          resolve(jsonData);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};

export const existSearchName = (dataJson: IModemsJSON, lowercaseSearchName: string) => {
  const existInJson = dataJson.models.filter(item => item.vendor.toLowerCase() === lowercaseSearchName);
  return existInJson;
}

export const leftOuterJoin = (leftArray: any[], rightArray: any[], leftField1: string, rightField1: string, leftField2: string, rightField2: string) => {
  const result = [];

  for (const leftItem of leftArray) {
    const rightItem = rightArray.find((item) => item[rightField1] === leftItem[leftField1] && item[rightField2] === leftItem[leftField2]) ;

    if (!rightItem) {
      result.push({ ...leftItem });
    }
  }
  return result;
};

export const writeJSONFile = (filePath: string, updatedContent: string) => {
  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir el archivo JSON:', err);
      }
      console.log('Los objetos se han agregado correctamente al archivo JSON.');
    });
}

export const updateContentInJson = (newObjects: IModems[], dataJson: IModemsJSON) => {
  dataJson.models.push(...newObjects);
  const updatedContent = JSON.stringify(dataJson, null, 2); 
  return updatedContent;
}