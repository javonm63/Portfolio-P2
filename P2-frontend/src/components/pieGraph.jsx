import {React, useEffect} from 'react'
import { Pie } from 'react-chartjs-2'
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales} from 'chart.js/auto'
import '../styles/pieGraphCard.css'
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
function PieGraphCard({paid, unpaid}) {
    const data2 = {
        labels: ['Paid', 'Unpaid'],
        datasets: [
            {
                label: 'Paid vs. Unpaid',
                data: [paid, unpaid],
                borderColor: "rgba(45, 55, 0, 0)",
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
        scales: false
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
        <section className='pie-chart-container'>
            <Pie data={data2} options={options} />
        </section>
    )
}

export default PieGraphCard
