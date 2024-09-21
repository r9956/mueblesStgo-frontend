import React from 'react'
import Grid from '@mui/material/Grid2'
import NavegationCard from '../components/NavegationCard'
import WorkIcon from '@mui/icons-material/Work'
import PaidIcon from '@mui/icons-material/Paid'
import GroupIcon from '@mui/icons-material/Group'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import WorkOffIcon from '@mui/icons-material/WorkOff'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'

const Dashboard = () => {
  const cards = [
    { title: 'Negocio', icon: WorkIcon, nav: '/business' },
    { title: 'Planilla de sueldos', icon: PaidIcon, nav: '/payroll' },
    { title: 'Empleados', icon: GroupIcon, nav: '/employee/list' },
    { title: 'Horas extra', icon: WatchLaterIcon, nav: '/extra-hours' },
    { title: 'Ausencias', icon: WorkOffIcon, nav: '/absences' },
    { title: 'Cargar reloj', icon: WorkHistoryIcon, nav: '/clock-data' },
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
