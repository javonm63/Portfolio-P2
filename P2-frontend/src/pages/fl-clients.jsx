import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import '../styles/fl-clients.css'
import NewClientInfo from "../components/newClientCard.jsx";
import TableCard from "../components/tableCard.jsx";
import { showMoreHook } from '../hooks/fi-invoicesHooks'
import MoreInfo from "../utils/moreInfo.jsx";
import { useEffect } from "react";
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'

function FlClients() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const moreInfo = showMoreHook()
    const setShowMore = moreInfo.setShowMoreInfo
    const showMore = moreInfo.showMoreInfo
    const showSendInfo = () => {
        setShowMore(true)
    }
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
        <div className="clients-page-container">
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>CLIENTS</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <h2 className="page-sub-titles">ADD NEW CLIENT</h2>
            <NewClientInfo />
            <button className="addNewClient-button">Add Client</button>
            <h2 className="page-sub-titles">YOUR CLIENTS</h2>
            <div className='clients-sub-page-container'>
                <MoreInfo showMore={showMore} setShowMore={setShowMore} MoreInfoTitle={'Clients page info.'} MoreInfoText={"On the clients page you can add new clients, remove clients and edit clients' information. To remove clients click their ID numbers, to edit a client's information click the client's name."} />
                <button className='inv-sub-page-text' type="button" onClick={showSendInfo}>See clients page info.</button>
                <TableCard tableWidth={'95%'} tableID={"add-client-table-body"} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STATUS'} />
            </div>
        </div>
    )
}

export default FlClients