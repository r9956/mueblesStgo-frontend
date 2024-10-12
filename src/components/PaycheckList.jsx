import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Add this import
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import paycheckService from "../services/paycheck.service";
import PaycheckFilter from './PaycheckFilter';
import { Typography } from "@mui/material";
import CenteredButton from "./CenteredButton";

const PaycheckList = () => {
  const [paychecks, setPaychecks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const location = useLocation(); // Add this line

  const init = () => {
    paycheckService
      .getAll()
      .then((response) => {
        setPaychecks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching paychecks:", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  // Extrae el año y el mes desde los parámetros de la query
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year');
  const month = queryParams.get('month');

  // Si existe un año y un mes, se filtra la planilla, en caso contrario se muestra toda la información
  useEffect(() => {
    if (year && month) {
      handleFilter(year, month);
    }
  }, [year, month]);

  const handleFilter = (year, month) => {
    paycheckService
      .dateFilter(year, month)
      .then((response) => {
        setPaychecks(response.data);
        setPage(0);
      })
      .catch((error) => {
        console.log("Error fetching filtered data:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPaychecks = paychecks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Typography variant="h6">Planillas de sueldos</Typography>
        </div>
        <PaycheckFilter onFilter={handleFilter} />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Categoría</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Años de servicio</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Sueldo Base</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Bonif. Servicio</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Bonif. Hrs Extra</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Descuentos</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Cotización previsional</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Cotización salud</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPaychecks.map((paycheck) => (
              <TableRow key={paycheck.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">{paycheck.rut}</TableCell>
                <TableCell align="left">{paycheck.name}</TableCell>
                <TableCell align="center">{paycheck.category}</TableCell>
                <TableCell align="center">{paycheck.serviceYears}</TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.monthlyBaseSalary)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.serviceBonus)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.extraHoursBonus)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.discounts)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.retirementDeduction)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.healthDeduction)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(paycheck.totalSalary)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={paychecks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Cantidad por página"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          labelpagination="Páginas"
        />
      </TableContainer>
      <CenteredButton buttonLabel="Volver a inicio" targetPath="/" sx={{ marginTop: 2 }} />
    </>
  );
};

export default PaycheckList;
