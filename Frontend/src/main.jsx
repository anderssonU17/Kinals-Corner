import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { AppRouter } from './AppRouter.jsx'
import { Register } from './register/pages/Register'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Register />
    </BrowserRouter>
  </React.StrictMode>,
)
