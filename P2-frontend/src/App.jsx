import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import FlDashboard from './pages/fl-dashboard.jsx'
import FlInvoices from './pages/fl-invoices.jsx'
import FlClients from './pages/fl-clients.jsx'
import FlReports from './pages/fl-reports.jsx'

function App() {
  return (
    <div className='body'>
      <nav>
        <Link to="/fl/dashboard"></Link>
        <Link to="/fl/invoices"></Link>
        <Link to="/fl/clients"></Link>
        <Link to="/fl/reports"></Link>
      </nav>
      <Routes>
        <Route path="/fl/dashboard" element={<FlDashboard />}></Route>
        <Route path="/fl/invoices" element={<FlInvoices />}></Route>
        <Route path="/fl/clients" element={<FlClients />}></Route>
        <Route path="/fl/reports" element={<FlReports />}></Route>
      </Routes>
    </div>
  )
}

export default App
