// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmployeeList from './components/EmployeeList'
import AddEditEmployee from './components/AddEditEmployee'
import ClockData from './pages/ClockData'
import { Container } from '@mui/material'
import DrawerAppBar from './components/AppBar'
import ExtraHours from './pages/ExtraHours'

function App() {
  return (
    <Container>
      <Router>
      <DrawerAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/list" element={<EmployeeList />} />
          <Route path="/employee/add" element={<AddEditEmployee />} />
          <Route path="/extra-hours" element={<ExtraHours />} />
          <Route path="/clock-data" element={<ClockData />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;