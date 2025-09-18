import '../styles/fl-reports.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import WebNavbar from "../components/webNav.jsx";
import ReportsGraphCard from '../components/reportsGraphCard.jsx';
import PieGraphCard from '../components/pieGraph.jsx';
import TotalsCard from '../components/reportsTotalsCard.jsx';
import { useEffect } from 'react';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'

function FlReports() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

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
                    <ReportsGraphCard gaphLabel={"Monthly Earnings"}/>
                </div>
                <div className='reports-right-container'>
                    <PieGraphCard />
                </div>
            </article>
            <TotalsCard totalTitle={'Total Earned'}/>
        </div>
    )
}

export default FlReports