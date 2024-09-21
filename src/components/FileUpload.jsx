import React, { useState } from 'react';
import { Button, Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import uploadClockData from '../services/clockData.service';

const FileUpload = ({ config }) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUploadClick = async () => {
    try {
      const file = document.querySelector('input[type="file"]').files[0];
      if (file) {
        const response = await uploadClockData(file);
        const { status, data } = response;

        if (status === 200) {
          if (data.includes('ADVERTENCIA') || data.includes('ERROR')) {
            setUploadStatus(data); // Set warning or error message
            setSuccessMessage(''); // Clear success message
          } else {
            // Successful case
            setUploadStatus('success');
            setSuccessMessage(data); // Set the success response message
            setFileName(file.name); // Store the file name for display
          }
        }
      }
    } catch (error) {
      setUploadStatus('Error: No se pudo subir el archivo.');
      console.error('Upload failed:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} style={{ padding: '42px' }}>
        <Grid container direction={'column'} spacing={6}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">{config.label}</Typography>
          </Grid>
          {uploadStatus === 'success' ? (
            <>
              <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body1">
                  {`Archivo "${fileName}" ingresado correctamente.`}
                </Typography>
              </Grid>
              <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="green">
                  {successMessage.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ p: 2, border: '1px dashed grey' }}>
                  <input
                    type="file"
                    accept={config.accept}
                    onChange={handleFileChange}
                    style={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleUploadClick}
                  style={{ width: 'auto' }}
                >
                  Upload Document
                </Button>
              </Grid>
            </>
          )}
          {uploadStatus && uploadStatus !== 'success' && (
            <Grid style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color={uploadStatus.startsWith('ADVERTENCIA') ? 'orange' : 'error'}>
                {uploadStatus.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default FileUpload;
