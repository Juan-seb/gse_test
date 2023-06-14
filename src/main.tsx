import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
import { ThemeProvider } from '@material-tailwind/react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReduxProvider from './redux/Provider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />

  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
)
