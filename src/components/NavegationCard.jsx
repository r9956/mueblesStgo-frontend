import React, { useState } from 'react'
import { Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2'

const NavegationCard = ({ title, icon: Icon, nav }) => {
  const navigate = useNavigate();
  const [elevation, setElevation] = useState(1);  // State to control elevation

  const handleClick = () => {
    navigate(nav);
  };

  return (
    <Grid>
      <Paper
        elevation={elevation}
        sx={{
          width: '200px',
          height: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
        onClick={handleClick}
        onMouseEnter={() => setElevation(6)}
        onMouseLeave={() => setElevation(1)}
      >
        {Icon && <Icon style={{ fontSize: '40px' }} />}
        <h3>{title}</h3>
      </Paper>
    </Grid>
  );
};

export default NavegationCard;