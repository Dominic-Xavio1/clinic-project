import React from 'react'
import DashboardMain from './components/pages/dashboard-main'
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import LandingPage from './components/landing-page/landingPagev2'
import {Toaster} from 'react-hot-toast'
import {ToastContainer} from "react-toastify"
import RegisterPatience from './components/pages/register-patient'
import CreateReport from './components/pages/create-report'  
import DiseasesPage from './components/pages/diseases'
import MessagesPage from './components/pages/messages'
import RegisterNurse from './components/pages/register-nurse'
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
              <Route path="/diseases" element={<DiseasesPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/register-nurse" element={<RegisterNurse />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      <Toaster position="top-right" reverseOrder={false} containerStyle={{ zIndex: 99999 }} />
    </div>
  )
}

export default App