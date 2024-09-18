import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import employeeService from '../services/employee.service';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    employeeService
    .getAll()
    .then((response) => {
      console.log("Mostrando listado de todos los empleados.", response.data);
      setEmployees(response.data);
    })
    .catch(error => {
      console.log('Se ha producido un error al intentar mostrar el listado de empleados.',
        error);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="employee/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir empleado
        </Button>
      </Link>
      <br /> <br />
    </TableContainer>
  );
};

export default EmployeeList;
