import { useState, useEffect } from 'react'
import './searchbar.css'
import SideNavBar from './sideNav.jsx'

function Searchbar({setShowWebNav}) {
    const [sideNav, setSideNav] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showDisplay, setShowDisplay] = useState(false)
    
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
            <div>
            <h2 id="web-logo">FLInnvoices.com</h2>
            <h2 id="mobile-logo">FLI.com</h2>
            </div>
            <input id="searchBar" className="search-input" type="type" placeholder='Search' style={{display: showDisplay ? 'flex' : 'none'}}></input>
            <div className='icon-div'>
                <img id="search-icon" className="searchbar-icons" src="/search-icon.png" alt="search icon" onClick={showSearchbar}></img>
                <img id="menu-icon" className="searchbar-icons" src="/sidenav-icon.png" alt="menu icon" onClick={() => setSideNav(true)}></img>
                <img id="notif-icon" className="searchbar-icons" src="/notif-icon.png" alt="menu icon"></img>
            </div>

            <SideNavBar sideNav={sideNav} setSideNav={setSideNav} />
        </nav> 

    )
}

export default Searchbar