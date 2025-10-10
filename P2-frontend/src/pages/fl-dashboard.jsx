import {navbarHooks, showAddClient, showDrafts} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import '../styles/fl-dashboard.css'
import WebNavbar from "../components/webNav.jsx";
import Card from "../components/card.jsx";
import TableCard from "../components/tableCard.jsx";
import QaCard from "../components/qaCard.jsx";
import BarGraphCard from "../components/barGraphCard.jsx";
import { useEffect } from "react";
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import getCookie from "../utils/getCookie.jsx";
import { reportsHooks, sendInvHook, sendToHooks } from '../hooks/fi-invoicesHooks.jsx';
import { flInvoicesHooks, showAlertHooks } from "../hooks/fl-apiHooks.jsx";
import NewClientInfo from "../components/newClientCard.jsx";
import { flAddClientHooks } from "../hooks/fl-clientsHooks.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { displayNotifsHooks } from '../hooks/notifisHooks.jsx'
import MoreInfo from "../utils/moreInfo.jsx";

function FlDashboard() {
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

    const sendHook = flAddClientHooks()
    const send = sendHook.send
    const setSend = sendHook.setSend
    const dispClient = sendHook.dispClient
    const setDispClient = sendHook.setDispClient
    const sendToHook = sendToHooks()
    const sendTo = sendToHook.sendTo
    const setSendTo = sendToHook.setSendTo

    const addClientHook = showAddClient() 
    const disp = addClientHook.disp
    const setDisp = addClientHook.setDisp
    const dispInv = addClientHook.dispInv
    const setDispInv = addClientHook.setDispInv

    const sendPopupHooks = sendInvHook()
    const inv = sendPopupHooks.inv
    const setInv = sendPopupHooks.setInv

    const draftsHooks = showDrafts()
    const showDraft = draftsHooks.showDraft
    const setShowDraft = draftsHooks.setShowDraft

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
            const req = await fetch('http://localhost:6001/api/fl/refresh', {
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

            const reportsReq = await fetch('http://localhost:6001/api/fl/reports', {
                method: 'GET',
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

            const dataReq = await fetch('http://localhost:6001/api/fl/invoices', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!dataReq.ok) {
                const data = await dataReq.json()
                console.log(data)
            } else {
                const data = await dataReq.json()
                const database = data.data 
                if (database === undefined || database.length === 0) {
                    console.log('nothing here')
                } else {
                    const unsent = database.filter((invoice) => invoice.stat === 'Waiting')
                    const all = database.filter((invoice) => invoice.stat === 'Sent')
                    const paid = database.filter((invoice) => invoice.stat === 'Paid')
                    const allInvArr = []
                    all.forEach((inv) => allInvArr.push(inv))
                    paid.forEach((inv) => allInvArr.push(inv))
                    setDisplayItems(unsent)
                    setDisplayAllInvs(allInvArr)

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
                        const reportsReq = await fetch('http://localhost:6001/api/fl/reports', {
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

            const req2 = await fetch('http://localhost:6001/api/fl/draft', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
            if (!req2.ok) {
                const error = await req2.json()
                console.log(error)
            } else {
                const data = await req2.json()
                const draftArr = []
                const database = data.data.Draft
                if (database) {
                    for (const [key, value] of Object.entries(database)) {
                        draftArr.push(value)
                    }
                    setShowDraft(draftArr)
                }
            }
            try {
                const notifReq = await fetch('http://localhost:6001/api/fl/notifications', {
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
    const {earned, overdue} = reports

    return (
        <div className="dashboard-page-container">
            <Searchbar setAlertTitle={setAlertTitle} setShowAlert={setShowAlert} setAlertText={setAlertText} dispNalert={dispNalert} setDispNalert={setDispNalert} dispNotifs={dispNotif} sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>DASHBOARD</h1>
            </header>
            <WebNavbar showWebNav={showWebNav} />
            <article className="cards-container">
                <Card cardTitle={"EARNINGS"} cardText={`$${String(earned)}`}/>
                <Card cardTitle={"OUTSTANDING"} cardText={String(overdue)}/>
            </article>
            <TableCard display2={displayItems} tableWidth={'90vw'} pageSubTitle={"INVOICE STATUS"} tableID={"home-table-body"} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STATUS'}/>
            <article className="quick-actions-container">
                <QaCard setDisp={setDisp} qaCardTitle={'CLIENTS'} qaBtnText={'ADD CLIENT'} qaCardHref={'/fl/clients'} qaLinkText={'EDIT CLIENT'} />
                <QaCard setDisp={setDispInv} qaCardTitle={'INVOICES'} qaBtnText={'INVOICES'} qaCardHref={'/fl/invoices'} qaLinkText={'ADD INVOICE'} />
            </article>
            <span className="page-sub-title-cont">
                <h3 className="page-sub-titles">EARNINGS</h3>
            </span>
            <article className="barGraph-container2">
                <BarGraphCard />
            </article>
            <article className="drafted-div">
                <TableCard display2={showDraft} pageSubTitle={"DRAFTED INVOICES"} tableID={'home-draft-table'} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STAT'} />
            </article>

            <aside className="add-client-container" style={{display: disp ? 'flex' : 'none'}}>
                <button className="exit-button" type="button" style={{display: disp ? 'flex' : 'none'}} onClick={() => setDisp(false)}>X</button>
                <h3 className="dash-sub-title">ADD NEW CLIENT</h3>
                <NewClientInfo disp={disp} setDisp={setDisp} setSendTo={setSendTo} setSend={setSend} setDisplay={setDispClient} send={send}/>
                <button className="addNewClient-button" onClick={() => {setSend(true)}}>Add Client</button>
            </aside>
            <aside className="all-invoices-container" style={{display: dispInv ? 'flex' : 'none'}}>
                <button className="exit-button" type='button' onClick={() => setDispInv(false)} style={{display: dispInv ? 'flex' : 'none'}}>X</button>
                <h3 className="dash-sub-title" style={{display: dispInv ? 'flex' : 'none'}}>ALL INVOICES</h3>
                <InvSubPages title1={'INVOICE'} title2={'CLIENT'} title3={'AMOUNT'} title4={'STAT'} setInv={setInv} setDispItem={setDisplayAllInvs} display2={displayAllInvs} showPage={dispInv} subPageInfo={'See more info'} subPageInfoText={'All invoices page info.'} infoText={"On this page you can view, delete or print created invoices. To view an invoice click the invoice ID, to print an invoice click the client's name and to delete an invoice click the 'status' of that invoice."}/>
            </aside>
            <MoreInfo MoreInfoTitle={alertTitle} MoreInfoText={alertText} showMore={showAlert} setShowMore={setShowAlert} />
        </div>
    )
}

export default FlDashboard 

// ADD EARNINGS GRAPH MONTHLY LOGIC 
// ADD SERACHBAR LOGIC 