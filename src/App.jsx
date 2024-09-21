// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeList from './components/EmployeeList';
import AddEditEmployee from './components/AddEditEmployee';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/list" element={<EmployeeList />} />
          <Route path="/employee/add" element={<AddEditEmployee />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
