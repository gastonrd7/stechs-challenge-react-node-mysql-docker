import { IModemItem, IModemItemToAddInJson } from "../inteerfaces/modem";

export const fetchDataFromAPI = async (vendor: string): Promise<{data: IModemItem[], status: number}> => {
  try {
    // Hacer la llamada a la API externa usando fetch o Axios
    const response = await fetch(`http://localhost:3001/Api/modems/${vendor}`);
    let data: any[];
    if(response.status === 204) {
      data = [];
      return {data, status: 204};
    }

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API');
    }
    data = await response.json();
    return {data, status: 200};
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw new Error('Error al obtener los datos de la API');
  }
};


export const addDataFromAPI = async (inputData: IModemItemToAddInJson[], search: string): Promise<IModemItem[]> => {
  try {
      const response = await fetch('http://localhost:3001/Api/modems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputData, search }), // Ajusta esto según la estructura de datos que esperas en el servidor
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      throw new Error('Error al obtener los datos de la API');
    }
};