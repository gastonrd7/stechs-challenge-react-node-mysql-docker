import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IModemItem, IModemItemToAddInJson } from '../../inteerfaces/modem';
import { addDataFromAPI, fetchDataFromAPI } from '../../api/modem';
import { getUniqueObjectsByProperties, mapImodemItemToIModemItemToAddInJson } from '../../utils/modem';


export interface ModemState {
  data: IModemItem[];
  status: 'idle' | 'ok' | 'loading' | 'failed' | 'noContent'; 
};

const initialState: ModemState = {
  data: [],
  status: 'idle',
};

export const fetchModems = createAsyncThunk<{data: IModemItem[], status: number}, string>(
  'modem/fetchData',
  async (vendor: string, thunkAPI) => {
    const result: {data: IModemItem[], status: number} = await fetchDataFromAPI(vendor);
    return result;
  }
);
export const addModems = createAsyncThunk<IModemItem[], {items: IModemItem[], search: string}>(
  'modem/addData',
  async (parameters: {items: IModemItem[], search: string}, thunkAPI) => {
    const itemsJson: IModemItemToAddInJson[] = mapImodemItemToIModemItemToAddInJson(parameters.items);
    const uniquePeople = getUniqueObjectsByProperties(itemsJson, ['vendor', 'name', 'soft']);
    const data = await addDataFromAPI(uniquePeople, parameters.search);
    return data;
  }
);

export const modemSlice = createSlice({
  name: 'modem',
  initialState,
  reducers: {
    cleanModems: (state) => {
      state.data = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchModems.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case 200:
            state.status = 'ok';
            break;
          case 204:
            state.status = 'noContent';
            break;
        };
        state.data = action.payload.data;
      })
      .addCase(fetchModems.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addModems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addModems.fulfilled, (state, action) => {
        state.status = 'ok';
        state.data = action.payload;
      })
      .addCase(addModems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {cleanModems} = modemSlice.actions;

export const selectModems = (state: RootState) => state.modems;


export default modemSlice.reducer;