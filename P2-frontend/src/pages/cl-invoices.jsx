import '../styles/cl-invoices.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import ClWebNavbar from "../components/clWebNav.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { showSendPage2, showSendPage, showAllPage, showMerchHook } from "../hooks/fi-invoicesHooks.jsx";
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx';
import LandingPgMenuCard from '../components/LandingPageMenu.jsx';
import { useEffect } from 'react';

function ClInvoices() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const newpageHook = showSendPage2()
    const showNew = newpageHook.showSend2
    const setShowNew = newpageHook.setShowSend2

    const sendpageHook = showSendPage()
    const showSend = sendpageHook.showSend
    const setShowSend = sendpageHook.setShowSend

    const allpageHook = showAllPage()
    const showAll = allpageHook.showAll
    const setShowAll = allpageHook.setShowAll

    const merchPageHook = showMerchHook()
    const showMerch = merchPageHook.showMerch
    const setShowMerch = merchPageHook.setShowMerch

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

    const showNewInvPg = () => {
        setShowNew(true)
        setShowSend(false)
        setShowAll(false)
        setShowMerch(false)
    }
    const showSendInvPg = () => {
        setShowSend(true)
        setShowNew(false)
        setShowAll(false)
        setShowMerch(false)
    }
    const showAllInvPg = () => {
        setShowAll(true)
        setShowNew(false)
        setShowSend(false)
        setShowMerch(false)
    }
    const showMerchPg = () => {
        setShowMerch(true)
        setShowAll(false)
        setShowNew(false)
        setShowSend(false)
    }

    return (
        <div className='cl-invoices-page-container'>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>INVOICES</h1>
            </div>
            <ClWebNavbar showWebNav={showWebNav} />
            <LandingPgMenuCard showSend={showSendInvPg} showNewPg={showNewInvPg} showAll={showAllInvPg} showMerch={showMerchPg} submenuText1={'NEW'} submenuText2={'SAVED'} submenuText3={'ALL'} submenuText4={'MERCHANTS'}/>
            <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showNew ? 'flex' : 'none'}}>NEW INVOICES</h3>
            <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showSend ? 'flex' : 'none'}}>SEND INVOICE</h3>
            <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showAll ? 'flex' : 'none'}}>ALL INVOICES</h3>
            <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showMerch ? 'flex' : 'none'}}>MERCHANTS</h3>
            <div className="clInvs-page-container">
                <InvSubPages darkMode={darkMode} showPage={showNew} subPageInfo={'See more info'} subPageInfoText={'New invoices info.'} infoText={"This page allows you to pay for invoices by clicking the invoice ID."}/>
                <InvSubPages darkMode={darkMode} showPage={showSend} subPageInfo={'See more info'} subPageInfoText={'Saving invoices info.'} infoText={"Here you can view or print paid/saved invoices, to view click the invoice ID or to print click the invoice status."}/>
                <InvSubPages darkMode={darkMode} showPage={showAll} subPageInfo={'See more info'} subPageInfoText={'All invoices info.'} infoText={"All the invoices that comes to your account is saved here regardless if the invoice is paid or unpaid."}/>
                <InvSubPages darkMode={darkMode} showPage={showMerch} subPageInfo={'See more info'} subPageInfoText={'Merchants info.'} infoText={"All the freelancers that have sent you invoices contact information are saved here To view a freelancer's info click their name."}/>
            </div>
        </div> 
    )
}

export default ClInvoices