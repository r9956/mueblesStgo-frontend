import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import employeeService from '../services/employee.service'
import Grid from '@mui/material/Grid2';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper"
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea borrar este empleado?"
    );
    if (confirmDelete) {
      employeeService
        .remove(id)
        .then((response) => {
          console.log("Empleado eliminado correctamente.")
          init();})
        .catch((error) => {
          console.log("Se ha producido un error al intenter eliminar", error
        )
      })
    }
  }

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/employee/edit/${id}`);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const calculateYears = (date) => {
    const start = new Date(date);
    const today = new Date();
    let years = today.getFullYear() - start.getFullYear();
    const monthDifference = today.getMonth() - start.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < start.getDate())) {
      years--;
    }
  
    return years;
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Grid container justifyContent="center">
      <Link
        to="/employee/add"
        style={{ textDecoration: "none"}}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir empleado
        </Button>
      </Link>
      </Grid>
      <br /> <br />
      <Table sx={{ minWIdth: 650, marginBottom: 2 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Rut
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Edad
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Años de servicio
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Categoría
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEmployees.map((employee) =>(
            <TableRow
              key={employee.id}
              sx={{ "&:last-child td, &:last-child th": { border:0 } }}
            >
              <TableCell align="center">{employee.rut}</TableCell>
              <TableCell align="left">{employee.names} {employee.lastNames}</TableCell>
              <TableCell align="center">{calculateYears(employee.birthDate)}</TableCell>
              <TableCell align="center">{calculateYears(employee.startDate)}</TableCell>
              <TableCell align="center">{employee.category}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(employee.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(employee.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Cantidad por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        labelpagination="Páginas"
      />
    </TableContainer>
  );
};

export default EmployeeList;