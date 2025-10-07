import '../styles/cl-invoices.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import ClWebNavbar from "../components/clWebNav.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { showSendPage2, showSendPage, showAllPage, showMerchHook } from "../hooks/fi-invoicesHooks.jsx";
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx';
import LandingPgMenuCard from '../components/LandingPageMenu.jsx';
import { useEffect } from 'react';
import getCookie from '../utils/getCookie.jsx';
import { flInvoicesHooks } from '../hooks/fl-apiHooks.jsx';
import { displayHooks } from '../hooks/cl-hooks.jsx';

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

    const invoiceInputHooks = flInvoicesHooks()
    const displayItem = invoiceInputHooks.displayItem
    const setDisplayItem = invoiceInputHooks.setDisplayItem

    const clInvsHooks = displayHooks()
    const savedDisp = clInvsHooks.savedDisp
    const setSavedDisp = clInvsHooks.setSavedDisp
    const alldDisp = clInvsHooks.allDisp
    const setAllDisp = clInvsHooks.setAllDisp
    const merchdDisp = clInvsHooks.merchDisp
    const setMerchDisp = clInvsHooks.setMerchDisp
    const viewSaved = clInvsHooks.viewSaved
    const setViewSaved = clInvsHooks.setViewSaved

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

        async function loadInvs() {
            const csrfToken = getCookie('csrfToken')
            const req = await fetch('http://localhost:6001/api/cl/refresh', {
                method: 'POST',
                headers: {"x-csrf-token": `Bearer ${csrfToken}`, 'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!req.ok) {
                const data = await req.json()
                console.log(data.message)
                if (data.message === 'Unauthorized user') {
                    window.location.href = '/'
                }
            }


            try {
                const req = await fetch('http://localhost:6001/api/cl/invoices', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })
                if (!req.ok) {
                    const error = await req.json()
                    console.log(error)
                } else {
                    const data = await req.json()
                    for (const key in data.data) {
                        if (data.data[key].item) {
                            delete data.data[key].item
                        }
                        if (data.data[key].stat) {
                            delete data.data[key].stat
                        }
                    }
                    const clMerchArr = []
                    const clInvsArr = []
                    for (const [key, value] of Object.entries(data.data)) {
                        if (typeof value !== 'object') continue;
                        value.stat = 'Unpaid'
                        clInvsArr.push(value)
                        clMerchArr.push(value.merch)
                    }
                    const clPaidArr = []
                    for (const [key, value] of Object.entries(data.paid)) {
                        clPaidArr.push(value)
                    }
                    const clAllArr = []
                    clInvsArr.forEach((inv) => {
                        clAllArr.push(inv)
                    })
                    clPaidArr.forEach((inv) => {
                        clAllArr.push(inv)
                    })
                    setDisplayItem(clInvsArr)
                    setSavedDisp(clPaidArr)
                    setAllDisp(clAllArr)
                    setMerchDisp(clMerchArr)
                }
            } catch (err) {
                console.log(err)
            }
        }
        loadInvs()
    }, [0])

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
        setViewSaved(true)
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
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>INVOICES</h1>
            </header>
            <ClWebNavbar showWebNav={showWebNav} />
            <LandingPgMenuCard showSend={showSendInvPg} showNewPg={showNewInvPg} showAll={showAllInvPg} showMerch={showMerchPg} submenuText1={'NEW'} submenuText2={'SAVED'} submenuText3={'ALL'} submenuText4={'MERCHANTS'}/>
            <article>
                <header>
                    <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showNew ? 'flex' : 'none'}}>NEW INVOICES</h3>
                    <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showSend ? 'flex' : 'none'}}>SAVED INVOICE</h3>
                    <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showAll ? 'flex' : 'none'}}>ALL INVOICES</h3>
                    <h3 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"} style={{display: showMerch ? 'flex' : 'none'}}>MERCHANTS</h3>
                </header>
            <div className="clInvs-page-container">
                <InvSubPages title1={'INVOICE'} title2={'BILLED TO'} title3={'AMOUNT'} title4={'STAT'} display={displayItem} darkMode={darkMode} showPage={showNew} subPageInfo={'See more info'} subPageInfoText={'New invoices info.'} infoText={"This page allows you to pay for invoices by clicking the invoice status."}/>
                <InvSubPages view={viewSaved} title1={'INVOICE'} title2={'BILLED TO'} title3={'AMOUNT'} title4={'STAT'} display2={savedDisp} darkMode={darkMode} showPage={showSend} subPageInfo={'See more info'} subPageInfoText={'Saving invoices info.'} infoText={"Here you can view or print paid/saved invoices, to view click the invoice ID or to print click the invoice status."}/>
                <InvSubPages title1={'INVOICE'} title2={'BILLED TO'} title3={'AMOUNT'} title4={'STAT'} display2={alldDisp} darkMode={darkMode} showPage={showAll} subPageInfo={'See more info'} subPageInfoText={'All invoices info.'} infoText={"All the invoices that comes to your account is saved here regardless if the invoice is paid or unpaid."}/>
                <InvSubPages title1={'NAME'} title2={'EMAIL'} title3={'PHONE'} title4={'COMP.'} display5={merchdDisp} darkMode={darkMode} showPage={showMerch} subPageInfo={'See more info'} subPageInfoText={'Merchants info.'} infoText={"All the freelancers that have sent you invoices contact information are saved here To view a freelancer's info click their name."}/>
            </div>
            </article>
        </div> 
    )
}

export default ClInvoices

// continue prop drilling the view boolean hook into tableCard 