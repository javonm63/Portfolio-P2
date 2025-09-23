import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import FlLandingPage from './pages/fl-landing-page.jsx'
import ClLandingPage from './pages/cl-landing-page.jsx'
import FlDashboard from './pages/fl-dashboard.jsx'
import FlInvoices from './pages/fl-invoices.jsx'
import FlClients from './pages/fl-clients.jsx'
import FlReports from './pages/fl-reports.jsx'
import FlSettings from './pages/fl-settings.jsx'
import ClDashboard from './pages/cl-dashboard.jsx'
import ClInvoices from './pages/cl-invoices.jsx'
import ClReports from './pages/cl-reports.jsx'
import ClProfile from './pages/cl-profile.jsx'
import FreelancerRole from './utils/routeRoles.jsx'
import { AuthProvider } from './context/authContext.jsx'

function App() {
  return (
    <AuthProvider>
      <div className='app-body'>
        <nav>
        <Link to="/"></Link>
        <Link to="/cl"></Link>
        <Link to="/fl/dashboard"></Link>
        <Link to="/fl/invoices"></Link> 
        <Link to="/fl/clients"></Link>
        <Link to="/fl/reports"></Link>
        <Link to="/fl/settings"></Link>
        <Link to="/cl/dashboard"></Link>
        <Link to="/cl/invoices"></Link> 
        <Link to="/Cl/reports"></Link>
        <Link to="/cl/profile"></Link>

      </nav>
      <Routes>
        <Route path="/" element={<FlLandingPage />}></Route>
        <Route path="/cl" element={<ClLandingPage />}></Route>

        <Route path="/fl/dashboard" element={<FreelancerRole><FlDashboard /></FreelancerRole>}></Route>
        <Route path="/fl/invoices" element={<FreelancerRole><FlInvoices /></FreelancerRole>}></Route>
        <Route path="/fl/clients" element={<FreelancerRole><FlClients /></FreelancerRole>}></Route>
        <Route path="/fl/reports" element={<FreelancerRole><FlReports /></FreelancerRole>}></Route>
        <Route path="/fl/settings" element={<FreelancerRole><FlSettings /></FreelancerRole>}></Route>
        <Route path="/cl/dashboard" element={<ClDashboard />}></Route>
        <Route path="/cl/invoices" element={<ClInvoices />}></Route>
        <Route path="/Cl/reports" element={<ClReports />}></Route>
        <Route path="/Cl/profile" element={<ClProfile />}></Route>
      </Routes>
      </div>
    </AuthProvider>

  )
}

export default App
