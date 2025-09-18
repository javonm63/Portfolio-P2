import '../styles/cl-dashboard.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import {showDarkModeHook} from '../hooks/landingPageHooks.jsx'
import Searchbar from "../components/searchbar";
import ClWebNavbar from "../components/clWebNav.jsx";
import Card from "../components/card.jsx";
import TableCard from "../components/tableCard.jsx";
import QaCard from "../components/qaCard.jsx";
import PieGraphCard from '../components/pieGraph.jsx';
import ReportsGraphCard from '../components/reportsGraphCard.jsx';
import { useEffect } from 'react';


function ClDashboard() {
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
        <div className="dashboard-page-container">
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className= {darkMode ? "page-titles" : 'page-titles dark'}>DASHBOARD</h1>
            </header>
            <ClWebNavbar darkMode={darkMode} showWebNav={showWebNav} />
            <section className="cards-container">
                <Card darkMode={darkMode} cardTitle={"UNPAID"} cardText={'0'}/>
                <Card darkMode={darkMode} cardTitle={"OUTSTANDING"} cardText={'0'}/>
            </section>
            <TableCard darkMode={darkMode} tableWidth={'90vw'} pageSubTitle={"INVOICE STATUS"} tableID={"cl-home-table-body"} invNumText={'INVOICE'} clientText={'DATE'} amountText={'AMOUNT'} statusText={'STATUS'}/>
            <h2 className={darkMode ? "page-sub-titles dark" : 'page-sub-titles'}>QUICK ACTIONS</h2>
            <section className="cl-quickActions-container">
                <QaCard qaCardTitle={'INVOICES'} qaBtnText={'SEE INVOICES'} qaCardHref={'/Cl/invocies'} qaLinkText={'PAY INVOICE'} />  
            </section>
            <span className="page-sub-title-cont">
                <h3 className={darkMode ? "page-sub-titles dark" : 'page-sub-titles'}>YOUR STATS</h3>
            </span>
            <article className='yourStats-main-container'>
                <div className={darkMode ? 'reports-left-container dark' : 'reports-left-container'}>
                    <ReportsGraphCard graphLabel={"Overdue per Month"}/>
                </div>
                <div className={darkMode ? 'reports-right-container dark' : 'reports-right-container'}>
                    <PieGraphCard />
                </div>
            </article>
        </div>
    )
}

export default ClDashboard
