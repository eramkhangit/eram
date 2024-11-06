import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import {  ThemeProvider } from '@mui/material/styles';
import theme from './Theme/theme.js'


createRoot(document.getElementById('root')).render(

  <ThemeProvider theme={theme} > 

  <HashRouter >
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>

  </ThemeProvider>

)
