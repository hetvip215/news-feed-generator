// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Landing from './pages/Landing.jsx'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Landing />} />
      <Route
        path='home'
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
