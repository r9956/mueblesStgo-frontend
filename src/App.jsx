// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import DrawerAppBar from './components/AppBar'
import Home from './pages/Home'
import EmployeeList from './components/EmployeeList'
import AddEditEmployee from './components/AddEditEmployee'
import ExtraHours from './pages/ExtraHours'
import Absences from './pages/Absences'
import ClockData from './pages/ClockData'

function App() {
  return (
    <Container>
      <Router>
      <DrawerAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/list" element={<EmployeeList />} />
          <Route path="/employee/add" element={<AddEditEmployee />} />
          <Route path="/employee/edit/:id" element={<AddEditEmployee/>} />
          <Route path="/extra-hours" element={<ExtraHours />} />
          <Route path="/absences" element={<Absences />} />
          <Route path="/clock-data" element={<ClockData />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;