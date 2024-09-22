import React, { useState } from 'react';
import { Container, Button, Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import uploadClockData from '../services/clockData.service';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

const FileUploadForm = ({ onFileChange, onUploadClick, config, file }) => (
  <>
    <Grid item style={{ 
      marginTop: 'auto', 
      display: 'flex', 
      justifyContent: 'center'
    }}>
      <Box sx={{ 
        p: 2, 
        height: '100px', 
        border: '1px dashed grey',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <input
          type="file"
          accept={config.accept}
          onChange={onFileChange}
          style={{ width: '100%' }}
        />
      </Box>
    </Grid>
    <Grid item style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        onClick={onUploadClick}
        style={{ width: 'auto' }}
        disabled={!file}
        startIcon={<UploadFileOutlinedIcon />}
      >
        Subir archivo
      </Button>
    </Grid>
  </>
);

const SuccessMessage = ({ fileName, successMessage, onReset }) => (
  <Grid
    container
    direction="column"
    justifyContent="space-between"
    style={{ flex: 1 }}
  >
    <Grid item style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{
          p: 2,
          border: '1px dashed grey',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="caption">
            {`Archivo "${fileName}" ingresado correctamente.`}
          </Typography>
      </Box>
    </Grid>
    <Grid item style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ 
          p: 2, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Typography variant="caption" color="green" style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
          {successMessage}
        </Typography>
      </Box>
    </Grid>
    <Grid item style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="outlined"
        onClick={onReset}
        style={{ marginTop: '20px' }}
      >
        Subir otro archivo
      </Button>
    </Grid>
  </Grid>
);

const WarningOrErrorMessage = ({ message, onReset }) => (
  <Grid
    container
    direction="column"
    justifyContent="space-between"
    style={{ flex: 1 }}
  >
    <Grid item style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Typography
        variant="caption"
        color={message.startsWith('ADVERTENCIA') ? 'orange' : 'error'}
        style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', marginBottom: '20px' }}
      >
        {message}
      </Typography>
    </Grid>
    <Grid item style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="outlined"
        onClick={onReset}
        style={{ marginTop: '20px' }}
      >
        Subir otro archivo
      </Button>
    </Grid>
  </Grid>
);

const ClockDataFileUpload = ({ config }) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUploadClick = async () => {
    try {
      if (file) {
        const response = await uploadClockData(file);
        const { status, data } = response;

        if (status === 200) {
          if (data.includes('ADVERTENCIA')) {
            setUploadStatus('warning');
            setSuccessMessage(data);
          } else if (data.includes('ERROR')) {
            setUploadStatus('error');
            setSuccessMessage(data);
          } else {
            setUploadStatus('success');
            setSuccessMessage(data);
          }
        }
      }
    } catch (error) {
      setUploadStatus('error');
      setSuccessMessage('Error: No se pudo subir el archivo.');
      console.error('Upload failed:', error);
    }
  };

  const handleResetComponent = () => {
    setUploadStatus(null);
    setFile(null);
    setFileName('');
    setSuccessMessage('');
    document.querySelector('input[type="file"]').value = null;
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={2}
        style={{
          padding: '42px',
          width: '100%',
          height: '375px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid container direction="column" style={{ flex: 1 }} sx={{ gap: 3 }}>
          <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">{config.label}</Typography>
          </Grid>

          {uploadStatus === 'success' ? (
            <SuccessMessage
              fileName={fileName}
              successMessage={successMessage}
              onReset={handleResetComponent}
            />
          ) : uploadStatus === 'warning' || uploadStatus === 'error' ? (
            <WarningOrErrorMessage
              message={successMessage}
              onReset={handleResetComponent}
            />
          ) : (
            <FileUploadForm
              onFileChange={handleFileChange}
              onUploadClick={handleUploadClick}
              config={config}
              file={file}
            />
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default ClockDataFileUpload;
