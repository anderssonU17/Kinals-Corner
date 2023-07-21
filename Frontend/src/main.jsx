import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import { AppRouter } from './AppRouter.jsx'
=======
import { AppRouter } from './AppRouter'
>>>>>>> jcastro-2021416
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);