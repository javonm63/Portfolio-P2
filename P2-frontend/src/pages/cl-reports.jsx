import '../styles/fl-reports.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import ClWebNavbar from "../components/clWebNav.jsx";
import ReportsGraphCard from '../components/reportsGraphCard.jsx';
import PieGraphCard from '../components/pieGraph.jsx';
import TotalsCard from '../components/reportsTotalsCard.jsx';
import { useEffect } from 'react';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx';

function ClReports() {
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
            <ClWebNavbar showWebNav={showWebNav} />
            <span className='reports-subtitles-container'>
                <h2 id="monthly-title" className={darkMode ? "reports-page-sub-titleL dark" : "reports-page-sub-titleL"}>OVERDUE PER MONTH</h2>
                <h2 id="PvsUP-title" className={darkMode ? "reports-page-sub-titleR dark" : "reports-page-sub-titleR"}>PAID VS. UNPAID</h2>
            </span>
            <main className='reports-main-container'>
                <div className={darkMode ? 'reports-left-container dark' : 'reports-left-container'}>
                    <ReportsGraphCard graphLabel={"Monthly Earnings"}/>
                </div>
                <div className={darkMode ? 'reports-right-container dark' : 'reports-right-container'}>
                    <PieGraphCard />
                </div>
            </main>
            <TotalsCard darkMode={darkMode} totalTitle={"Total Spent"}/>
        </div>
    )
}

export default ClReports