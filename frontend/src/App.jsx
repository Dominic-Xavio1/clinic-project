import React from 'react'
import DashboardMain from './components/pages/dashboard-main'
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import LandingPage from './components/landing-page/landingPage'
import {Toaster} from 'react-hot-toast'
import {ToastContainer} from "react-toastify"
import RegisterPatience from './components/pages/register-patient'
import CreateReport from './components/pages/create-report'  
const ProtectedRoute = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardMain />} />
              <Route path="/register" element={<RegisterPatience />} />
              <Route path="/create-report" element={<CreateReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      <Toaster position="top-right" reverseOrder={false} containerStyle={{ zIndex: 99999 }} />
    </div>
  )
}

export default App