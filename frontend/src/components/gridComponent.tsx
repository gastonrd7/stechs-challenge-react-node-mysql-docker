import React, { useState } from 'react';
import { IModemItem } from '../inteerfaces/modem';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import { parsedStringsToObjects } from '../utils/modem';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height: 'auto',
    background: '#6a858c'
  },
  spaceHeader: {
    height: '40px',
  },
  buttonAdd: {
    height: '40px',
    background: '#11914b',
    '&:hover': {
      backgroundColor: '#0be365',
    },
  }
});

const columns: GridColDef[] = [
  { field: 'modem_macaddr', headerName: 'MAC address', width: 200 },
  { field: 'ipaddr', headerName: 'IP', width: 200 },
  { field: 'vsi_model', headerName: 'Modelo', width: 200 },
  {
    field: 'vsi_vendor',
    headerName: 'Fabricante',
    width: 150,
  },
  {
    field: 'vsi_swver',
    headerName: 'Versión',
    width: 350
  },
];

const getRowId = (row: IModemItem) => {
  return JSON.stringify(row);
};

interface GridProps {
  data: IModemItem[];
  handleAdd: any;
}

const GridComponent: React.FC<GridProps> = ({ data, handleAdd }) => {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState<IModemItem[]>([]);

  const handleSelectionChange = (selectionModel: any[]) => {
    const parsedObjects = parsedStringsToObjects(selectionModel);
    setSelectedRows(parsedObjects);
  };

  const preHandleAdd = () => {
    selectedRows.length > 0 && handleAdd(selectedRows);
    setSelectedRows([]);
  };

  return (
    <div className={classes.table}>
        {selectedRows.length > 0 ? 
        <Button className={classes.buttonAdd} variant="contained" onClick={preHandleAdd}>Agregar</Button> : <div className={classes.spaceHeader} />}
        <div>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          getRowId={getRowId}
        />
        </div>
    </div>
  );
};

export default GridComponent;