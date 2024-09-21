import React from 'react'
import { Helmet } from 'react-helmet'
import ClockDataFileUpload from '../components/ClockDataFileUpload'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Muebles Stgo</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta
          name="keywords"
          content="react,material,kit,application,dashboard,admin,template"
        />
      </Helmet>

      <div>
        <h1>Welcome to Muebles Stgo</h1>
        <p>hola</p>
          
        <ClockDataFileUpload 
          config={{
            label: 'Upload Clock Data',
            accept: '.txt',
            handleUpload: () => {
              console.log('Clock data upload triggered!');
            }
          }} 
        />


      </div>
    </>
  );
}
