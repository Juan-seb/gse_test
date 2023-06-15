import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import PageFact from './components/PageFact/index.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReduxProvider from './redux/Provider'
import Root from './Root.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: 'fact/:id',
    element: <PageFact />
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
