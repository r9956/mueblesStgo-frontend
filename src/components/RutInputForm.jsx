import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { format } from 'rutility';

export default function RutInputForm({ onRutChange }) {
  const [rut, setRut] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRutChange = (e) => {
    const value = e.target.value;
    const formattedRut = format.dotDash(value); // Format the RUT

    setRut(formattedRut);
    onRutChange(formattedRut); // Pass the formatted RUT back to the parent

    const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/;
    if (formattedRut.length > 0 && !regex.test(formattedRut)) {
      setError(true);
      setErrorMessage('RUT inválido. Formato 11.111.111-1');
    } else {
      setError(false);
      setErrorMessage('');
    }
  };

  return (
    <TextField
      required
      id="outlined-required"
      label="Rut del trabajador"
      value={rut}
      onChange={handleRutChange}
      error={error}
      helperText={error ? errorMessage : ''}
      fullWidth
    />
  );
}
