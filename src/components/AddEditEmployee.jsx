import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import employeeService from "../services/employee.service";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import TextField from "@mui/material/TextField";
import { Button, Container, Paper, Typography } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

import RutInputForm from '../components/RutInputForm';
import DatePickerComponent from '../components/DatePicker';

const AddEditEmployee = () => {
  const [rut, setRut] = useState("");
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const [titleEmployeeForm, setTitleEmployeeForm] = useState("");
  const navigate = useNavigate();

  const saveEmployee = (e) => {
    e.preventDefault();

    const employee = { rut, names, lastNames, birthDate, startDate, category, id };
    if (id) {
      //Actualizar Datos Empelado
      employeeService
        .update(id, employee)
        .then((response) => {
          console.log("Empleado ha sido actualizado.", response.data);
          navigate("/employee/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del empleado.",
            error
          );
        });
    } else {
      //Crear nuevo empleado
      employeeService
        .create(employee)
        .then((response) => {
          console.log("Empleado ha sido añadido.", response.data);
          navigate("/employee/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo empleado.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleEmployeeForm("Editar Empleado");
      employeeService
        .get(id)
        .then((employee) => {
          setRut(employee.data.rut);
          setNames(employee.data.names);
          setLastNames(employee.data.lastNames)
          setBirthDate(employee.data.birthDate);
          setStartDate(employee.data.startDate);
          setCategory(employee.data.category);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleEmployeeForm("Nuevo Empleado");
    }
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper elevation={1} style={{ padding: '24px' }}>
        <Grid container spacing={2} direction='column' alignItems="center">
          <Typography variant="h6">{titleEmployeeForm}</Typography>
            <form>
              <Grid container spacing={2} direction='column' alignItems="center">
                <RutInputForm initialRut={rut} onRutChange={setRut} />
              
              <FormControl fullWidth>
                <TextField
                  id="names"
                  label="Nombres"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  id="lastNames"
                  label="Apellidos"
                  value={lastNames}
                  onChange={(e) => setLastNames(e.target.value)}
                />
              </FormControl>

              <DatePickerComponent label="Fecha de nacimiento" initialDate={birthDate} onDateChange={setBirthDate} />

              <DatePickerComponent label="Fecha de inicio en la empresa" initialDate={startDate} onDateChange={setStartDate} />

              <FormControl fullWidth>
                <TextField
                  id="category"
                  label="Categoría"
                  value={category}
                  select
                  defaultValue="A"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                </TextField>
              </FormControl>

              <FormControl>

              <Button
                sx={{
                  marginTop: 2, 
                  marginBottom: 2
                }}
                variant="contained"
                onClick={(e) => saveEmployee(e)}
                startIcon={<SaveIcon />}
                disabled={!rut || !names || !lastNames || !birthDate || !startDate || !category}
              >
                Grabar
              </Button>

              </FormControl>
            </Grid>
          </form>
        </Grid>
      </Paper>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="20vh"
      >
        <Link to="/employee/list">
          <Button variant="text">Volver atrás</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default AddEditEmployee;