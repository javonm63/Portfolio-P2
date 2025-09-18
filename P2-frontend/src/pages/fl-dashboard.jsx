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
    })

    return (
        <div className="dashboard-page-container">
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>DASHBOARD</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <div className="cards-container">
                <Card cardTitle={"EARNINGS"} cardText={'$0'}/>
                <Card cardTitle={"OUTSTANDING"} cardText={'0'}/>
            </div>
            <TableCard tableWidth={'90vw'} pageSubTitle={"INVOICE STATUS"} tableID={"home-table-body"} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STATUS'}/>
            <div className="quick-actions-container">
                <QaCard qaCardTitle={'CLIENTS'} qaBtnText={'ADD CLIENT'} qaCardHref={'/fl/clients'} qaLinkText={'EDIT CLIENT'} />
                <QaCard qaCardTitle={'INVOICES'} qaBtnText={'INVOICES'} qaCardHref={'/fl/invoices'} qaLinkText={'ADD INVOICE'} />
            </div>
            <div className="page-sub-title-cont">
                <h3 className="page-sub-titles">EARNINGS</h3>
            </div>
            <div className="barGraph-container2">
                <BarGraphCard />
            </div>
            <div className="drafted-div">
                <TableCard pageSubTitle={"DRAFTED INVOICES"} tableID={'home-draft-table'} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'MADE'} />
            </div>
        </div>
    )
}

export default FlDashboard 