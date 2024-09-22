import React, { useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DatePickerComponent from '../components/DatePicker';
import RutInputForm from '../components/RutInputForm';
import FileUpload from '../components/FileUploader';
import extraHourAuthorization from '../services/extraHoursAuthorization.service.js';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

export default function ExtraHours() {
  const [file, setFile] = useState(null);
  const [rut, setRut] = useState('');
  const [date, setDate] = useState(null);

  const handleFileUploaded = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleSend = async () => {
    //console.log('Rut:', rut);
    //console.log('Date:', date);
    //console.log('File:', file);

    if (!rut || !date || !file) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await extraHourAuthorization(rut, date.format('YYYY-MM-DD'), file);
      console.log('Response:', response);
      alert('Datos enviados correctamente.');

    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar los datos.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={1} style={{ padding: '24px' }}>
        <Grid container spacing={3} direction='column' alignItems="center">
          <Grid sx={{mt:2, mb: 2}}>
            <Typography variant="h6">Ingresar autorización de horas extra</Typography>
          </Grid>
          <Grid item xs={12} sm={6} style={{ width: '223px', maxWidth: '300px' }}>
            <RutInputForm onRutChange={setRut} />
          </Grid>
          <Grid item xs={12} sm={6} style={{ width: '223px', maxWidth: '300px' }}>
            <DatePickerComponent onDateChange={setDate} />
          </Grid>
          <Grid>
            <FileUpload onFileUploaded={handleFileUploaded} />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={handleSend}
              style={{ width: 'auto' }}
              startIcon={<UploadFileOutlinedIcon />}
              disabled={!rut || !date || !file}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}