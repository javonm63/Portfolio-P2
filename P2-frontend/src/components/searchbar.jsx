import { useEffect, useState } from 'react'
import '../styles/searchbar.css'
import SideNavBar from './sideNav.jsx'
import { showMenuHook, showClMenuHook, searhbarHooks, showNotifHook, } from '../hooks/fl-dashboardHooks.jsx'
import NotifsPage from './notifsCard'
import ClSideNavBar from './clSideNav.jsx'

function Searchbar({ setShowWebNav, setSideNav, sideNav}) {
    const notifHook = showNotifHook()
    const showNotifs = notifHook.showNotif
    const setShowNotifs = notifHook.setShowNotif

    const openNotifPg = () => {
        setShowNotifs(true)
        setSideNav(false)
    }
    const menuHook = showMenuHook()
    const showMenu = menuHook.showMenu
    const setShowMenu = menuHook.setShowMenu

    const showMenuHook2 = showClMenuHook()
    const showClMenu = showMenuHook2.showClMenu
    const setShowClMenu = showMenuHook2.setShowClMenu

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
    useEffect(() => {
        const currUser = window.location.pathname
            switch (currUser) {
                case '/cl/dashboard' : 
                setShowMenu(true)
                break;
                case '/cl/invoices' : 
                setShowMenu(true)
                break;
                case '/cl/reports' : 
                setShowMenu(true)
                break;
                case '/cl/profile' : 
                setShowMenu(true)
                break;
                case '/fl/dashboard' : 
                setShowMenu(false)
                break;
                case '/fl/invoices' : 
                setShowMenu(false)
                break;
                case '/fl/clients' : 
                setShowMenu(false)
                break;
                case '/fl/reports' : 
                setShowMenu(false)
                break;
                case '/fl/settings' : 
                setShowMenu(false)
                break;
            }
    }, [0])
    const openMenu = () => {
        if (showMenu === true) {
            setSideNav(false)
            setShowClMenu(true)
        } else {
            setSideNav(true)
            setShowClMenu(false)
        }
        console.log(showMenu)
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
                <img id="menu-icon" className="searchbar-icons" src="/sidenav-icon.png" alt="menu icon" onClick={openMenu}></img>
                <img id="notif-icon" className="searchbar-icons" src="/notif-icon.png" alt="menu icon" onClick={openNotifPg}></img>
            </div>

            <SideNavBar sideNav={sideNav} setSideNav={setSideNav} openNotifPg={openNotifPg}/>
            <ClSideNavBar sideNav={showClMenu} setSideNav={setShowClMenu} openNotifPg={openNotifPg}/>
            <NotifsPage showNotifs={showNotifs} setShowNotifs={setShowNotifs}/>
        </nav> 

    )
}

export default Searchbar