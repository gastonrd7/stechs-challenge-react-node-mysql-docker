import { Request, Response } from 'express';
import { query } from '../database/connector';
import { existSearchName, leftOuterJoin, querySelectModems, readJSONFile, updateContentInJson, writeJSONFile } from '../utils/modem';
import { IModems } from '../interfaces/modems';

const filePath = './src/files/models.json';

export const getModems = async (req: Request, res: Response) => {
 try {
    const lowercaseSearchName = req.params.vendor.toLowerCase();
    
    const resultQueryInDataBase = await querySelectModems(lowercaseSearchName);
    if(resultQueryInDataBase.length === 0) {
      res.writeHead(204);
      res.end();
      return;
    };
    const dataJson = await readJSONFile(filePath);
    const existInJson = existSearchName(dataJson, lowercaseSearchName);
    const leftOuterJoinResult = leftOuterJoin(resultQueryInDataBase, existInJson, 'vsi_model', 'name', 'vsi_swver', 'soft');
    
    res.status(200).json(leftOuterJoinResult);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const addModems = async (req: Request, res: Response) => {
 try {
    const dataJson = await readJSONFile(filePath);
    const updatedContent = updateContentInJson(req.body.input, dataJson); 
    writeJSONFile(filePath, updatedContent);

    const lowercaseSearchName = req.body.search.toLowerCase();
    const resultQueryInDataBase = await querySelectModems(lowercaseSearchName);
    const dataJsonUpdated = await readJSONFile(filePath);
    const existInJson = existSearchName(dataJsonUpdated, lowercaseSearchName);
    const leftOuterJoinResult = leftOuterJoin(resultQueryInDataBase, existInJson,'vsi_model', 'name',  'vsi_swver', 'soft');
    
    res.status(201).json(leftOuterJoinResult);
  } catch (err) {
    console.error('Error al Agregar modems al JSON:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

