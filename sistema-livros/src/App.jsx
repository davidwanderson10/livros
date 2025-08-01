import './App.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';               
import 'primeicons/primeicons.css';                             
import 'primeflex/primeflex.css';                               
import AppRoutes from './routes';
import React from 'react';

function App() {

  return (
    <>
      <div>
        <AppRoutes />
      </div>
    </>
  )
}

export default App
