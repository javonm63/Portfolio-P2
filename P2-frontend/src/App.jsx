import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import FlDashboard from './pages/fl-dashboard.jsx'
import FlInvoices from './pages/fl-invoices.jsx'
import FlClients from './pages/fl-clients.jsx'
import FlReports from './pages/fl-reports.jsx'
import FlSettings from './pages/fl-settings.jsx'
import ClDashboard from './pages/cl-dashboard.jsx'

function App() {
  return (
    <div className='body'>
      <nav>
        <Link to="/fl/dashboard"></Link>
        <Link to="/fl/invoices"></Link>
        <Link to="/fl/clients"></Link>
        <Link to="/fl/reports"></Link>
        <Link to="/fl/settings"></Link>
        <Link to="/cl/dashboard"></Link>
      </nav>
      <Routes>
        <Route path="/fl/dashboard" element={<FlDashboard />}></Route>
        <Route path="/fl/invoices" element={<FlInvoices />}></Route>
        <Route path="/fl/clients" element={<FlClients />}></Route>
        <Route path="/fl/reports" element={<FlReports />}></Route>
        <Route path="/fl/settings" element={<FlSettings />}></Route>
        <Route path="/cl/dashboard" element={<ClDashboard />}></Route>
      </Routes>
    </div>
  )
}

export default App
