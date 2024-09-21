import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BasicDatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    onDateChange(newValue); // Pass the new date back to the parent
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
    console.log("Formatted date for backend:", formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Fecha"
          value={selectedDate}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
