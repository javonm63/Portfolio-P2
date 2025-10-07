import '../styles/fl-reports.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import WebNavbar from "../components/webNav.jsx";
import ReportsGraphCard from '../components/reportsGraphCard.jsx';
import PieGraphCard from '../components/pieGraph.jsx';
import TotalsCard from '../components/reportsTotalsCard.jsx';
import { useEffect } from 'react';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import getCookie from '../utils/getCookie.jsx';
import { reportsHooks } from '../hooks/fi-invoicesHooks.jsx';

function FlReports() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    const reportsHook = reportsHooks()
    const reports = reportsHook.reports
    const setReports = reportsHook.setReports

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme : dark)').matches) {
            setDarkMode(true)
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
        })
    })
    useEffect(() => {
        async function refresh() {
            const csrfToken = getCookie('csrfToken')
            const req = await fetch('http://localhost:6001/api/fl/refresh', {
                method: 'POST',
                headers: {"x-csrf-token": `Bearer ${csrfToken}`, 'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!req.ok) {
                const data = await req.json()
                console.log(data.message)
                if (data.message === 'Unauthorized user') {
                    window.location.href = '/'
                }
            }
            const reportsReq = await fetch('http://localhost:6001/api/fl/reports', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!reportsReq.ok) {
                const error = await reportsReq.json()
                console.log(error)
            } else {
                const data = await reportsReq.json()
                const {earned, unpaid, overdue, paidReport} = data.data
                setReports({earned, unpaid, overdue, paidReport})
            }
        }
        refresh()
    }, [])
    const {earned, unpaid, overdue, paidReport} = reports
    const paidArr = []
    const unpaidArr = []
    if (paidReport !== undefined || unpaid !== undefined) {
            paidArr.push(paidReport)
        unpaidArr.push(unpaid)
    } 

    return (
        <div className='flReports-page-container'>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>REPORTS</h1>
            </header>
            <WebNavbar showWebNav={showWebNav} />
            <span className='reports-subtitles-container'>
                <h2 id="monthly-title" className="reports-page-sub-titleL">MONTHLY EARNINGS</h2>
                <h2 id="PvsUP-title" className="reports-page-sub-titleR">PAID VS. UNPAID</h2>
            </span>
            <article className='reports-main-container'>
                <div className='reports-left-container'>
                    <ReportsGraphCard gaphLabel={'Monthly Earnings'}/>
                </div>
                <div className='reports-right-container'>
                    <PieGraphCard paid={paidArr[0]} unpaid={unpaidArr[0]}/>
                </div>
            </article>
            <TotalsCard totalTitle={'Total Earned'} earned={earned} unpaid={unpaid} overdue={overdue}/>
        </div>
    )
}

export default FlReports