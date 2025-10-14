import '../styles/cl-dashboard.css'
import {navbarHooks, showAddClient} from "../hooks/fl-dashboardHooks.jsx";
import {showDarkModeHook} from '../hooks/landingPageHooks.jsx'
import Searchbar from "../components/searchbar";
import ClWebNavbar from "../components/clWebNav.jsx";
import Card from "../components/card.jsx";
import TableCard from "../components/tableCard.jsx";
import QaCard from "../components/qaCard.jsx";
import PieGraphCard from '../components/pieGraph.jsx';
import ReportsGraphCard from '../components/reportsGraphCard.jsx';
import { reportsHooks, sendInvHook} from '../hooks/fi-invoicesHooks.jsx';
import getCookie from "../utils/getCookie.jsx";
import { useEffect } from 'react';
import { flInvoicesHooks, showAlertHooks } from '../hooks/fl-apiHooks.jsx';
import InvSubPages from '../components/invoicesSubPages.jsx';
import { displayHooks } from '../hooks/cl-hooks.jsx';
import { displayNotifsHooks } from '../hooks/notifisHooks.jsx';


function ClDashboard() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const darkModeHook = showDarkModeHook() 
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    const reportsHook = reportsHooks()
    const reports = reportsHook.reports
    const setReports = reportsHook.setReports

    const invoiceInputHooks = flInvoicesHooks()
    const displayItems = invoiceInputHooks.displayItems
    const setDisplayItems = invoiceInputHooks.setDisplayItems
    const displayAllInvs = invoiceInputHooks.displayAllInvs
    const setDisplayAllInvs = invoiceInputHooks.setDisplayAllInvs

    const addClientHook = showAddClient()
    const disp = addClientHook.disp
    const setDisp = addClientHook.setDisp
    const dispInv = addClientHook.dispInv
    const setDispInv = addClientHook.setDispInv

    const sendPopupHooks = sendInvHook()
    const inv = sendPopupHooks.inv
    const setInv = sendPopupHooks.setInv

    const clInvsHooks = displayHooks()
    const deleteAll = clInvsHooks.deleteAll
    const setDeleteAll = clInvsHooks.setDeleteAll

    const notificationHook = displayNotifsHooks()
    const dispNotif = notificationHook.dispNotifs
    const setDispNotifs = notificationHook.setDispNotifs
    const dispNalert = notificationHook.dispNalert
    const setDispNalert = notificationHook.setDispNalert

    const showAlertHook = showAlertHooks()
    const showAlert = showAlertHook.showAlert
    const setShowAlert = showAlertHook.setShowAlert
    const alertText = showAlertHook.alertText
    const setAlertText = showAlertHook.setAlertText
    const alertTitle = showAlertHook.alertTitle
    const setAlertTitle = showAlertHook.setAlertTitle

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
    useEffect(() => {
        async function refresh() {
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

            const dataReq = await fetch('http://localhost:6001/api/cl/invoices', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
 
            if (!dataReq.ok) {
                const data = await dataReq.json()
                console.log(data)
            } else {
                const data = await dataReq.json()
                const database1 = data.data 
                const database2 = data.paid
                if (database1 === undefined || database1.length === 0) {
                    console.log('nothing here')
                } else {
                    const unsent = [] 
                    for (const [key, value] of Object.entries(database1)) {
                        value.stat = 'Unpaid'
                        unsent.push(value)
                    }
                    const paid = [] 
                    for (const [key, value] of Object.entries(database2)) {
                        paid.push(value)
                    }
                    const allInvArr = []
                    const all = [...unsent, ...paid] 
                    all.forEach((inv) => allInvArr.push(inv))
                    paid.forEach((inv) => allInvArr.push(inv))
                    setDisplayItems(unsent)
                    setDisplayAllInvs(all)

                    const currEarnedArr = []
                    const currUnpaidArr = []
                    const currOverdueArr = []
                    const currPaidArr = []
                    paid.forEach((inv) => {
                        currEarnedArr.push(inv.total)
                        currPaidArr.push(currPaidArr.length + 1)
                    })
                    all.forEach((inv) => {
                        if (inv.stat === 'Sent') {
                            const now = new Date()
                            const dueDate = new Date(inv.due)
                            if (dueDate < now) {
                                currOverdueArr.push(currOverdueArr.length + 1)
                                currUnpaidArr.push(currUnpaidArr.length + 1)
                            } else {
                                currUnpaidArr.push(currUnpaidArr.length + 1)
                            }
                        }
                    })
                    const earned = currEarnedArr.reduce((sum, num) => sum + num, 0)
                    const unpaid = currUnpaidArr[currUnpaidArr.length - 1]
                    const overdue = currOverdueArr.reduce((sum, num) => sum + num, 0)
                    const paidReport = currPaidArr[0]
                    try {
                        const reportsReq = await fetch('http://localhost:6001/api/cl/reports', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({earned, unpaid, overdue, paidReport, post: 'post'}),
                            credentials: 'include'
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            const reportsReq = await fetch('http://localhost:6001/api/cl/reports', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!reportsReq.ok) {
                const error = await reportsReq.json()
                console.log(error)
            } else {
                const data = await reportsReq.json()
                const {earned, unpaid, overdue, paidReport} = data.data
                setReports({earned, unpaid, overdue, paidReport})
            }
            try {
                const notifReq = await fetch('http://localhost:6001/api/cl/notifications', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                })
                if (!notifReq.ok) {
                    const error = await notifReq.json()
                    console.log(error)
                } else {
                    const notifsDataArr = []
                    const notifsArr = []
                    const data = await notifReq.json()
                    const database = data.data
                    if (database) {
                        for (const [key, value] of Object.entries(database)) {
                            notifsDataArr.push(value)
                        }
                        notifsDataArr.forEach((notifObj) => {
                            const when = notifObj.when
                            const timeAgo = (when) => {
                                const now = new Date()
                                const then = new Date(when)
                                const diffMs = now - then
                                const diffMins = Math.floor(diffMs / (1000 * 60))
                                const diffHrs = Math.floor(diffMs / 60)
                                const diffDays = Math.floor(diffMs / 24)
                                if (diffMins < 1) {
                                    return 'Just now'
                                } 
                                if (diffMins < 60) {
                                    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
                                }
                                if (diffMins < 24) {
                                    return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`
                                }
                                return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
                            }
                            const whenNotif = timeAgo(when)
                            const newNotif = notifObj.notif 
                            notifsArr.push({newNotif, whenNotif})
                            setDispNalert(true)
                        })
                        setDispNotifs([...notifsArr])
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        refresh()
    }, [0])
    const {earned, unpaid, overdue, paidReport} = reports
    const paidArr = []
    const unpaidArr = []
    if (paidReport !== undefined || unpaid !== undefined) {
        paidArr.push(paidReport)
        unpaidArr.push(unpaid)
    } 

    return (
        <div className="dashboard-page-container">
            <Searchbar setAlertTitle={setAlertTitle} setShowAlert={setShowAlert} setAlertText={setAlertText} dispNalert={dispNalert} setDispNalert={setDispNalert} dispNotifs={dispNotif} sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className= {darkMode ? "page-titles" : 'page-titles dark'}>DASHBOARD</h1>
            </header>
            <ClWebNavbar darkMode={darkMode} showWebNav={showWebNav} />
            <section className="cards-container">
                <Card darkMode={darkMode} cardTitle={"UNPAID"} cardText={`$${String(earned)}`}/>
                <Card darkMode={darkMode} cardTitle={"OUTSTANDING"} cardText={String(overdue)}/>
            </section>
            <TableCard display6={displayItems} darkMode={darkMode} tableWidth={'90vw'} pageSubTitle={"INVOICE STATUS"} tableID={"cl-home-table-body"} invNumText={'INVOICE'} clientText={'DATE'} amountText={'AMOUNT'} statusText={'STATUS'}/>
            <h2 className={darkMode ? "page-sub-titles dark" : 'page-sub-titles'}>QUICK ACTIONS</h2>
            <section className="cl-quickActions-container">
                <QaCard setDel={setDeleteAll} setDisp={setDispInv} qaCardTitle={'INVOICES'} qaBtnText={'SEE INVOICES'} qaCardHref={'/cl/invoices'} qaLinkText={'PAY INVOICE'} />  
            </section>
            <span className="page-sub-title-cont">
                <h3 className={darkMode ? "page-sub-titles dark" : 'page-sub-titles'}>YOUR STATS</h3>
            </span>
            <article className='yourStats-main-container'>
                <div className={darkMode ? 'reports-left-container dark' : 'reports-left-container'}>
                    <ReportsGraphCard graphLabel={"Overdue per Month"}/>
                </div>
                <div className={darkMode ? 'reports-right-container dark' : 'reports-right-container'}>
                    <PieGraphCard paid={paidArr[0]} unpaid={unpaidArr[0]}/>
                </div>
            </article>

            <aside className="all-invoices-container" style={{display: dispInv ? 'flex' : 'none'}}>
                <button className="exit-button" type='button' onClick={() => setDispInv(false)} style={{display: dispInv ? 'flex' : 'none'}}>X</button>
                <h3 className="dash-sub-title" style={{display: dispInv ? 'flex' : 'none'}}>ALL INVOICES</h3>
                <InvSubPages deleteAll={deleteAll} title1={'INVOICE'} title2={'CLIENT'} title3={'AMOUNT'} title4={'STAT'} setInv={setInv} setDispItem={setDisplayAllInvs} display2={displayAllInvs} showPage={dispInv} subPageInfo={'See more info'} subPageInfoText={'All invoices page info.'} infoText={"On this page you can view, delete or print created invoices. To view an invoice click the invoice ID, to print an invoice click the client's name and to delete an invoice click the 'status' of that invoice."}/>
            </aside>
        </div>
    )
}

export default ClDashboard
