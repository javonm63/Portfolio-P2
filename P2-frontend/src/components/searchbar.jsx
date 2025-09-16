import { useEffect, useState } from 'react'
import '../styles/searchbar.css'
import SideNavBar from './sideNav.jsx'
import { searhbarHooks, showNotifHook } from '../hooks/fl-dashboardHooks.jsx'
import NotifsPage from './notifsCard'

function Searchbar({ setShowWebNav, setSideNav, sideNav}) {
    const notifHook = showNotifHook()
    const showNotifs = notifHook.showNotif
    const setShowNotifs = notifHook.setShowNotif

    const openNotifPg = () => {
        setShowNotifs(true)
        setSideNav(false)
    }
    const searchbarHook = searhbarHooks()
    const screenWidth = searchbarHook.screenWidth
    const setScreenWidth = searchbarHook.setScreenWidth
    const showDisplay = searchbarHook.showDisplay
    const setShowDisplay = searchbarHook.setShowDisplay
    
    useEffect(() => {
        const resizeScreen = () => {setScreenWidth(window.innerWidth)}
        window.addEventListener('resize', resizeScreen)
        return () => window.removeEventListener('resize', resizeScreen)
    })
    useEffect(() => {
        if (screenWidth > 1030) {
            setShowDisplay(true)
            setShowWebNav(true)
            return
        } else {
            setShowWebNav(false)
            return
        } 
    })
    const showSearchbar = () => {
        if (screenWidth < 1030 && showDisplay === false) {
            setShowDisplay(true)
            return
        } else if (screenWidth < 1030 && showDisplay === true) {
            setShowDisplay(false)
            return
        }
    }
    
    
    
    return ( 
        <nav className="searchbar-container">
            <div className='logo-container'>
            <p id="web-logo">FLInnvoices.com</p>
            <p id="mobile-logo">FLI.com</p>
            </div>
            <input id="searchBar" className="search-input" type="type" placeholder='Search' style={{display: showDisplay ? 'flex' : 'none'}}></input>
            <div className='icon-div'>
                <img id="search-icon" className="searchbar-icons" src="/search-icon.png" alt="search icon" onClick={showSearchbar}></img>
                <img id="menu-icon" className="searchbar-icons" src="/sidenav-icon.png" alt="menu icon" onClick={() => setSideNav(true)}></img>
                <img id="notif-icon" className="searchbar-icons" src="/notif-icon.png" alt="menu icon" onClick={openNotifPg}></img>
            </div>

            <SideNavBar sideNav={sideNav} setSideNav={setSideNav} openNotifPg={openNotifPg}/>
            <NotifsPage showNotifs={showNotifs} setShowNotifs={setShowNotifs}/>
        </nav> 

    )
}

export default Searchbar