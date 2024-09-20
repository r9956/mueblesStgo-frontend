import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList'
import AddEditEmployee from './components/AddEditEmployee'
import { Container } from '@mui/material';
import './App.css'

function App() {
  return (
    <Container>
      <Router>
        <div className="container">
          <Routes>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/employee/list" element={<EmployeeList />} />
            <Route path="/employee/add" element={<AddEditEmployee />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App
