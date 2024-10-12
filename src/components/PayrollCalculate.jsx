import { useState } from "react";
import { useNavigate } from "react-router-dom";
import payrollService from "../services/payroll.service";
import CalculateIcon from "@mui/icons-material/Calculate";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CenteredButton from "./CenteredButton";

const PayrollCalculate = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const calculatePayroll = async (e) => {
    e.preventDefault();
    try {
      const response = await payrollService.generatePayroll(year, month);
      const { status, data } = response;
  
      if (status === 200) {
        setUploadStatus('success');
        setMessage(data);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
  
        console.log('Error Response:', error.response);
        if (status === 400) {
          setUploadStatus('warning');
          setMessage(data);
        } else {
          setUploadStatus('error');
          setMessage("Error inesperado: No se pudo calcular la planilla.");
        }
      } else {
        setUploadStatus('error');
        setMessage("Error de red: No se pudo comunicar con el servidor.");
      }
    }
  };
  
  const handleResetComponent = () => {
    setUploadStatus(null);
    setYear("");
    setMonth("");
    setMessage("");
  };

  
  const SuccessMessage = ({ message, onReset }) => (
    <Grid container direction="column" justifyContent="space-between" style={{ flex: 1 }}>
      <Grid style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="caption" color="green" style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
          {message}
        </Typography>
      </Grid>
      <Grid style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh" sx={{ gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate(`/payroll/list?year=${year}&month=${month}`)}>
            Ver reporte
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  const WarningOrErrorMessage = ({ message, onReset }) => {
    const errorMessage = typeof message === 'string' ? message : 'Unknown error occurred';
    return (
      <Grid container direction="column" justifyContent="space-between" style={{ flex: 1 }}>
        <Grid style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="caption"
            color={errorMessage.startsWith('ADVERTENCIA') ? 'orange' : 'error'}
            style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
          >
            {errorMessage}
          </Typography>
        </Grid>
        <Grid style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh" sx={{ gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate("/payroll/list")}>
            Ver planillas de sueldos
          </Button>
      </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={1} style={{ padding: '24px' }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Typography variant="h6">Calcular Planilla de Sueldos</Typography>
          <Grid xs={12}>
            <FormControl fullWidth>
              <TextField
                id="year"
                label="Año"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                sx={{ minWidth: '300px', height: '56px', fontSize: '16px' }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth>
              <TextField
                id="month"
                label="Mes"
                value={month}
                select
                onChange={(e) => setMonth(e.target.value)}
                sx={{ minWidth: '300px', height: '56px', fontSize: '16px' }}
              >
                <MenuItem value={1}>Enero</MenuItem>
                <MenuItem value={2}>Febrero</MenuItem>
                <MenuItem value={3}>Marzo</MenuItem>
                <MenuItem value={4}>Abril</MenuItem>
                <MenuItem value={5}>Mayo</MenuItem>
                <MenuItem value={6}>Junio</MenuItem>
                <MenuItem value={7}>Julio</MenuItem>
                <MenuItem value={8}>Agosto</MenuItem>
                <MenuItem value={9}>Septiembre</MenuItem>
                <MenuItem value={10}>Octubre</MenuItem>
                <MenuItem value={11}>Noviembre</MenuItem>
                <MenuItem value={12}>Diciembre</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              onClick={calculatePayroll}
              startIcon={<CalculateIcon />}
              sx={{ marginTop: 2 }}
              disabled={!year || !month}
            >
              Calcular Planilla
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container direction="column" alignItems="center">
        {uploadStatus === 'success' && (
          <SuccessMessage message={message} onReset={handleResetComponent} />
        )}
        {uploadStatus === 'warning' || uploadStatus === 'error' ? (
          <WarningOrErrorMessage message={message} onReset={handleResetComponent} />
        ) : null}
      </Grid>

      <CenteredButton buttonLabel="Volver a inicio" targetPath="/" />

    </Container>
  );
};

export default PayrollCalculate;