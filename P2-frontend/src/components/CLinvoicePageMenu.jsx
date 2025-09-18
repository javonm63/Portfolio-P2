import '../styles/invoicePageMenu.css'
import { searhbarHooks, showNotifHook } from '../hooks/fl-dashboardHooks'
import { useEffect } from 'react'

function ClInvPgMenuCard({showSend, showNewPg, showAll, submenuText1, submenuText2, submenuText3}) {
    const landingNavHooks = showNotifHook()
    const display = landingNavHooks.showNotif
    const setDisplay= landingNavHooks.setShowNotif

    const screenHooks = searhbarHooks()
    const screenWidth = screenHooks.screenWidth
    const setScreenWidth = screenHooks.setScreenWidth

    useEffect(() => {
                const resizeScreen = () => {setScreenWidth(window.innerWidth)}
                window.addEventListener('resize', resizeScreen)
                return () => window.removeEventListener('resize', resizeScreen)
            })
            useEffect(() => {
                if (screenWidth > 1030) {
                    setDisplay(true)
                    return
                } else {
                    setDisplay(false)
                    return
                } 
            })

    return (
        <nav className="invoice-page-menu-cont" style={{display: display ? 'flex' : 'none'}}>
            <button className='invPage-menu-btns' type='button' onClick={showNewPg}>{submenuText1}</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>{submenuText2}</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>{submenuText3}</button>      
        </nav>
    )
}

export default ClInvPgMenuCard