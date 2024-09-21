import React from 'react';
import { Helmet } from 'react-helmet';
import { Paper, Box } from '@mui/material';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Muebles Stgo</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"

      >
        <Paper elevation={0} style={{ padding: '56px', width: '800px' }}>
          <Box>
            <Dashboard />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
