import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/es";
import dayjs from 'dayjs';

export default function DatePickerComponent({ label = 'Fecha', onDateChange, initialDate = null }) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  React.useEffect(() => {
    if (initialDate) {
      const formattedInitialDate = dayjs(initialDate);
      setSelectedDate(formattedInitialDate);
    }
  }, [initialDate]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    onDateChange(newValue);
    
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
    console.log("Formatted date for backend:", formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DatePicker
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
        />
    </LocalizationProvider>
  );
}
