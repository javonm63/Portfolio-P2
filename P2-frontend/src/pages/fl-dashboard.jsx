import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import '../styles/fl-dashboard.css'
import WebNavbar from "../components/webNav.jsx";
import Card from "../components/card.jsx";
import TableCard from "../components/tableCard.jsx";
import QaCard from "../components/qaCard.jsx";
import BarGraphCard from "../components/barGraphCard.jsx";
import { useEffect } from "react";
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'

function FlDashboard() {
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
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>DASHBOARD</h1>
            </header>
            <WebNavbar showWebNav={showWebNav} />
            <article className="cards-container">
                <Card cardTitle={"EARNINGS"} cardText={'$0'}/>
                <Card cardTitle={"OUTSTANDING"} cardText={'0'}/>
            </article>
            <TableCard tableWidth={'90vw'} pageSubTitle={"INVOICE STATUS"} tableID={"home-table-body"} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STATUS'}/>
            <article className="quick-actions-container">
                <QaCard qaCardTitle={'CLIENTS'} qaBtnText={'ADD CLIENT'} qaCardHref={'/fl/clients'} qaLinkText={'EDIT CLIENT'} />
                <QaCard qaCardTitle={'INVOICES'} qaBtnText={'INVOICES'} qaCardHref={'/fl/invoices'} qaLinkText={'ADD INVOICE'} />
            </article>
            <span className="page-sub-title-cont">
                <h3 className="page-sub-titles">EARNINGS</h3>
            </span>
            <article className="barGraph-container2">
                <BarGraphCard />
            </article>
            <article className="drafted-div">
                <TableCard pageSubTitle={"DRAFTED INVOICES"} tableID={'home-draft-table'} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'MADE'} />
            </article>
        </div>
    )
}

export default FlDashboard 