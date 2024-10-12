import React from 'react'
import Grid from '@mui/material/Grid2'
import NavegationCard from '../components/NavegationCard'
import BusinessIcon from '@mui/icons-material/Business'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import WorkOffOutlinedIcon from '@mui/icons-material/WorkOffOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const Dashboard = () => {
  const cards = [
    { title: 'Calcular planilla', icon: BusinessIcon, nav: '/payroll/calculate' },
    { title: 'Planillas de sueldos', icon: AttachMoneyIcon, nav: '/payroll/list' },
    { title: 'Empleados', icon: PeopleOutlinedIcon, nav: '/employee/list' },
    { title: 'Horas extra', icon: HourglassEmptyIcon, nav: '/extra-hours' },
    { title: 'Ausencias', icon: WorkOffOutlinedIcon, nav: '/absences' },
    { title: 'Cargar reloj', icon: AccessTimeIcon, nav: '/clock-data' },
  ]

  return (
    <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center" direction="column">
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <Grid container key={rowIndex}>
          {cards.slice(rowIndex * 3, rowIndex * 3 + 3).map((card, index) => (
            <NavegationCard key={index} title={card.title} icon={card.icon} nav={card.nav} />
          ))}
        </Grid>
      ))}
    </Grid>
  )
}

export default Dashboard