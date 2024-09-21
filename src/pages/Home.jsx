import React from 'react';
import { Helmet } from 'react-helmet';
import { Paper, Box } from '@mui/material';
import Dashboard from '../components/Dashboard';
import ClockDataFileUpload from '../components/ClockDataFileUpload';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Muebles Stgo</title>
        <meta name="description" content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style" />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <Paper elevation={0} style={{ padding: '24px', width: '100%' }}>
        <Box>
          <h1>Muebles Stgo</h1>
        </Box>
        <Box>
          <Dashboard />
        </Box>
      </Paper>

      {/* Uncomment if you need it */}
      {/* <ClockDataFileUpload 
          config={{
            label: 'Cargar información de reloj',
            accept: '.txt',
            handleUpload: () => {
              console.log('Clock data upload triggered!');
            }
          }} 
        /> */}
    </>
  );
}
