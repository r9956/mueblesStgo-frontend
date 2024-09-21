import React, { useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const FileUploadForm = ({ onFileChange }) => (
  <Grid style={{ display: 'flex', justifyContent: 'center' }}>
    <Box
      sx={{
        p: 2,
        height: '100px',
        border: '1px dashed grey',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        type="file"
        accept="application/pdf, image/jpeg, image/png"
        onChange={onFileChange}
        style={{ width: '100%' }}
      />
    </Box>
  </Grid>
);

const FileUpload = ({ onFileUploaded }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setErrorMessage('');
        onFileUploaded(selectedFile);  // Notify parent of the uploaded file
      } else {
        setErrorMessage('Tipo de archivo no permitido. Solo se permiten documentos o imágenes (JPG, PNG).');
        setFile(null);
        onFileUploaded(null);  // Notify parent to clear the file
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container direction="column" style={{ flex: 1 }} sx={{ gap: 3 }}>
        {errorMessage && (
          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          </Grid>
        )}
        <FileUploadForm onFileChange={handleFileChange} />
      </Grid>
    </Container>
  );
};

export default FileUpload;
