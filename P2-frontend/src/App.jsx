import { useState } from 'react'
import './App.css'
import FlDashboard from './pages/fl-dashboard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='body'>
      <FlDashboard />
    </div>
  )
}

export default App
