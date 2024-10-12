import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DatePickerComponent from '../components/DatePicker';
import RutInputForm from '../components/RutInputForm';
import FileUpload from '../components/FileUploader';
import absenceExcuse from '../services/absenceExcuse.service';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import BackToHomeButton from '../components/CenteredButton';
import CenteredButton from '../components/CenteredButton';

export default function absences() {
    const [file, setFile] = useState(null);
    const [rut, setRut] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const navigate = useNavigate();

    const handleFileUploaded = (uploadedFile) => {
        setFile(uploadedFile);
    };

    const handleSend = async () => {
        if (!rut || !fromDate || !toDate || !file) {
            alert('Por favor, completa todos los campos.');
            return;
        }
    
        try {
            const response = await absenceExcuse(
                rut, 
                fromDate.format('YYYY-MM-DD'), 
                toDate.format('YYYY-MM-DD'), 
                file
            );
    
            const successMessage = response.data || 'Datos enviados correctamente.';
            alert(successMessage);
            console.log('Response:', successMessage);
    
        } catch (error) {
            const errorMessage = error.response?.data || 'Error al enviar los datos.';
            alert(errorMessage);
            console.error('Error:', errorMessage);
        }
    };

    return(
        <Container maxWidth="xs">
            <Paper elevation={1} style={{ padding: '24px' }}>
                <Grid container spacing={3} direction='column' alignItems="center">
                <Grid sx={{mt:2, mb: 2}}>
                    <Typography variant="h6">Ingresar justificación de ausencia</Typography>
                </Grid>
                <Grid xs={12} sm={6} style={{ width: '223px', maxWidth: '300px' }}>
                    <RutInputForm onRutChange={setRut} />
                </Grid>
                <Grid xs={12} sm={6} style={{ width: '223px', maxWidth: '300px' }}>
                    <DatePickerComponent label="Desde" onDateChange={setFromDate} />
                </Grid>
                <Grid xs={12} sm={6} style={{ width: '223px', maxWidth: '300px' }}>
                    <DatePickerComponent label="Hasta" onDateChange={setToDate} />
                </Grid>
                <Grid>
                    <FileUpload onFileUploaded={handleFileUploaded} />
                </Grid>
                <Grid>
                    <Button
                    variant="contained"
                    onClick={handleSend}
                    style={{ width: 'auto' }}
                    startIcon={<UploadFileOutlinedIcon/>}
                    disabled={!rut || !fromDate || !toDate ||!file}
                    >
                    Enviar
                    </Button>
                </Grid>
                </Grid>
            </Paper>
            <CenteredButton buttonLabel="Volver a inicio" targetPath="/" />
        </Container>
    )
}