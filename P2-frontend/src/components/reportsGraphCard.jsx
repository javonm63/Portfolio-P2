import {React, useEffect} from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales} from 'chart.js/auto'
import '../styles/reportsGraphCard.css'
import { searhbarHooks, showGraph } from '../hooks/fl-dashboardHooks.jsx'

ChartJs.register(
    CategoryScale,
    LinearScale, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
function ReportsGraphCard({graphLabel}) {
    const data = {
        labels: ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: graphLabel,
                data: [12, 19, 3, 5, 2, 8, 12, 19, 3, 5, 2, 8],
                borderColor: "rgba(45, 55, 0, 0.47)",
                backgroundColor: ["rgba(54, 66, 0, 0.67)", "rgba(248, 236, 8, 1)"],
                tension: 0.3,
            },
        ],
    }
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: "rgba(40, 52, 1, 1)",
                },
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "rgba(40, 52, 1, 1)"
                },
            },
            y: {
                ticks: {
                    color: "rgba(40, 52, 1, 1)"
                },
                title: {
                    color: "rgba(40, 52, 1, 1)",
                },
            },
        },
    }
    
    const screenWidthHook = searhbarHooks()
    const screenWidth = screenWidthHook.screenWidth
    const setScreenWidth = screenWidthHook.setScreenWidth
    const showGraphs = showGraph()
    const showLineGraph = showGraphs.showLineGraph
    const setShowLineGraph = showGraphs.setShowLineGraph
    useEffect(() => {
        const resizeScreen = () => {setScreenWidth(window.innerWidth)}
        window.addEventListener('resize', resizeScreen)
        return () => window.removeEventListener('resize', resizeScreen)
    })
    useEffect(() => {
        if (screenWidth > 1030) {
            setShowLineGraph(true)
            return
        } else {
            setShowLineGraph(false)
            return
        } 
    })
    
    return (
        <section className='reportsGraphCard-cont'>
            <div className='reportGraph-container' style={{display: showLineGraph ? 'none' : 'flex'}}>
                <Bar data={data} options={options} />
            </div>
            <div className='report2Graph-container' style={{display: showLineGraph ? 'flex' : 'none'}}>
                <Line data={data} options={options} />
            </div>
        </section>
    )
}

export default ReportsGraphCard