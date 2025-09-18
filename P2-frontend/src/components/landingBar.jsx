import { useEffect, useState } from 'react'
import '../styles/searchbar.css'
import LandingSideNavBar from './landingSideNav.jsx'
import { searhbarHooks, navbarHooks } from '../hooks/fl-dashboardHooks.jsx'

function Landingbar({ setShowWebNav, setSideNav, sideNav,openSignup}) {
    const searchbarHook = searhbarHooks()
    const screenWidth = searchbarHook.screenWidth
    const setScreenWidth = searchbarHook.setScreenWidth
    
    useEffect(() => {
        const resizeScreen = () => {setScreenWidth(window.innerWidth)}
        window.addEventListener('resize', resizeScreen)
        return () => window.removeEventListener('resize', resizeScreen)
    })
    useEffect(() => {
        if (screenWidth > 1030) {
            setShowWebNav(true)
            return
        } else {
            setShowWebNav(false)
            return
        } 
    })
    const openMenu = () => {
            setSideNav(true)
    }
    
    return (
        <header className="searchbar-container">
            <div className='landing-logo-container'>
            <p id="web-logo">FLInnvoices.com</p>
            <p id="mobile-logo">FLI.com</p>
            </div>
            <div className='icon-div'>
                <img id="menu-icon" className="searchbar-icons" src="/sidenav-icon.png" alt="menu icon" onClick={openMenu}></img>
            </div>

            <LandingSideNavBar openSignup={openSignup} sideNav={sideNav} setSideNav={setSideNav}/>
        </header> 

    )
}

export default Landingbar