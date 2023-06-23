import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'
import { AppRouter } from './AppRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
);
