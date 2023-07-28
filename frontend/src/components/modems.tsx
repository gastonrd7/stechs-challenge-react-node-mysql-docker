import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import {
  selectModems,
  fetchModems,
  cleanModems,
  addModems,
} from '../state/slices/modemSlice';
import { IModemItem } from '../inteerfaces/modem';
import GridComponent from './gridComponent';
import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  search: {
    marginBottom: '10px',
    '& .MuiInputBase-input': {
      color: '#141516', // Color del texto dentro del TextField
    },
  },
});

export function Modems() {
  const classes = useStyles();
  const result = useAppSelector(selectModems);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  const handleSearch = () => {
    inputValue.length > 0 && dispatch(fetchModems(inputValue));
  };

  const handleInputClean = () => {
    setInputValue('');
    dispatch(cleanModems());
  }

  const handleAdd = (selectedRows: IModemItem[]) => {
    dispatch(addModems({items: selectedRows, search: inputValue}));
  };

  return (
    <React.Fragment>
      <Container>
        <Box sx={{ minHeight: '80vh' }} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField className={classes.search} id="outlined-basic" value={inputValue} label="BUSCAR FABRICANTE" variant="outlined" onChange={e => handleInputChange(e)} />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={handleSearch}>Buscar</Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" onClick={handleInputClean}>Limpiar</Button>
            </Grid>
          </Grid>
           {result.data.length > 0 ? <GridComponent data={result.data} handleAdd={handleAdd} /> 
           : 
           (result.status === 'noContent' ? 'No se encontraron fabricantes en la base de datos con respecto a la busqueda realizada' : 
           result.status === 'ok' ? 'El fabricante existe, pero no hay modelos desconocidos.' : 'El servicio esta listo para una busqueda')
           }
        </Box>
      </Container>
      
     
    </React.Fragment>
  );
}
