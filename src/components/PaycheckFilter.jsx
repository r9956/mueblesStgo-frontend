import React, { useState } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PaycheckFilter = ({ onFilter }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handleFilter = () => {
    onFilter(year, month);
  };

  return (
    <div style={{ margin: '10px 10px', display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: '100px' }}>
        <InputLabel
          style={{ top: -5 }}
        >
          Año
        </InputLabel>
        <Select
            required
          value={year}
          onChange={(e) => setYear(e.target.value)}
          label="Año"
          size="small"
          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={2024 - i}>
              {2024 - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: '100px' }}>
        <InputLabel
          style={{ top: -5 }}
        >
          Mes
        </InputLabel>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label="Mes"
          size="small"
          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Filtrar
      </Button>
    </div>
  );
};

export default PaycheckFilter;

