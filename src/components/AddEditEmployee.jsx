import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, AppBar } from '@mui/material';
import employeeService from '../services/employee.service';

const AddEditEmployee = () => {

  return (
    <>
      <div><Typography variant="h1">Añadir empleado</Typography></div>
      </>
  );
  
};

export default AddEditEmployee;