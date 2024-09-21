import React from 'react'
import { Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2'

const NavegationCard = ({ title, icon: Icon, nav }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(nav);
  };

  return (
    <Grid item>
      <Paper
        elevation={1}
        sx={{
          width: '200px',
          height: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        {Icon && <Icon style={{ fontSize: '40px' }} />}
        <h3>{title}</h3>
      </Paper>
    </Grid>
  );
};

export default NavegationCard
