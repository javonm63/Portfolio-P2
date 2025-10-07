import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import InvoiceInfoCard from '../components/invoiceInfoCard'
import TableCard from '../components/tableCard.jsx'
import '../styles/fl-invoices.css'
import InvPgMenuCard from "../components/invoicePageMenu.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { pageBodyHeight, showSendPage, showAllPage, showNewPage, showDraftsPage, sendInvHook, sendToHooks, showDraftInvsHooks, loadDraftHooks} from "../hooks/fi-invoicesHooks.jsx";
import { useEffect } from "react";
import { showDarkModeHook } from "../hooks/landingPageHooks.jsx";
import { flInvoicesHooks, showAlertHooks } from "../hooks/fl-apiHooks.jsx";
import MoreInfo from "../utils/moreInfo.jsx";
import getCookie from '../utils/getCookie.jsx'

function FlInvoices() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const pageBodyHook = pageBodyHeight()
    const bodyHeight = pageBodyHook.bodyHeight
    const setBodyHeight = pageBodyHook.setBodyHeight

    const newpageHook = showNewPage()
    const showNew = newpageHook.showNew
    const setShowNew = newpageHook.setShowNew

    const sendpageHook = showSendPage()
    const showSend = sendpageHook.showSend
    const setShowSend = sendpageHook.setShowSend

    const allpageHook = showAllPage()
    const showAll = allpageHook.showAll
    const setShowAll = allpageHook.setShowAll

    const draftspageHook = showDraftsPage()
    const showDraft = draftspageHook.showDraft
    const setShowDraft = draftspageHook.setShowDraft

    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    const invoiceInputHooks = flInvoicesHooks()
    const item = invoiceInputHooks.item
    const setItem = invoiceInputHooks.setItem
    const descript = invoiceInputHooks.description
    const setDescript = invoiceInputHooks.setDescription
    const quantity = invoiceInputHooks.quantity
    const setQuantity = invoiceInputHooks.setQuantity
    const price = invoiceInputHooks.price
    const setPrice = invoiceInputHooks.setPrice
    const name = invoiceInputHooks.name
    const setName = invoiceInputHooks.setName
    const date = invoiceInputHooks.date
    const setDate = invoiceInputHooks.setDate
    const dueDate = invoiceInputHooks.dueDate
    const setDueDate = invoiceInputHooks.setDueDate
    const id = invoiceInputHooks.id
    const setId = invoiceInputHooks.setId
    const notes = invoiceInputHooks.notes
    const setNotes = invoiceInputHooks.setNotes
    const fees = invoiceInputHooks.fees
    const setFees= invoiceInputHooks.setFees
    const discount = invoiceInputHooks.discount
    const setDiscount = invoiceInputHooks.setDiscount
    const coupon = invoiceInputHooks.coupon
    const setCoupon = invoiceInputHooks.setCoupon
    const displayItem = invoiceInputHooks.displayItem
    const setDisplayItem = invoiceInputHooks.setDisplayItem
    const isItem = invoiceInputHooks.isItem
    const setIsItem = invoiceInputHooks.setIsItem
    const displayItems = invoiceInputHooks.displayItems
    const setDisplayItems = invoiceInputHooks.setDisplayItems
    const displayAllInvs = invoiceInputHooks.displayAllInvs
    const setDisplayAllInvs = invoiceInputHooks.setDisplayAllInvs

    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const alertText = alertHooks.alertText
    const setAlertText = alertHooks.setAlertText

    const sendPopupHooks = sendInvHook()
    const inv = sendPopupHooks.inv
    const setInv = sendPopupHooks.setInv
    const sendPopup = sendPopupHooks.sendPopup
    const setSendPopup = sendPopupHooks.setSendPopup

    const sendToHook = sendToHooks()
    const sendTo = sendToHook.sendTo
    const setSendTo = sendToHook.setSendTo

    const showDraftedInvs = showDraftInvsHooks()
    const showDraftInvs = showDraftedInvs.showDraftInvs
    const setShowDraftInvs = showDraftedInvs.setShowDraftInvs

    const loadDraftHook = loadDraftHooks()
    const loadDraft = loadDraftHook.loadDraft
    const setLoadDraft = loadDraftHook.setLoadDraft
    const loadDft = loadDraftHook.loadDft
    const setLoadDft = loadDraftHook.setLoadDft

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

            const clientReq = await fetch('http://localhost:6001/api/fl/clients', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!clientReq.ok) {
                const data = await clientReq.json()
            } else {
                const data = await clientReq.json()
                if (data.data) {
                    const dataArr = []
                    const dataObj = data.data[0]
                    const database = dataObj.database
                    for (const value of Object.values(database)) {
                        const {name, email, phone, city} = value 
                        dataArr.push({name, email, phone, city})
                    }
                    setSendTo(dataArr)
                }
            }
        }
        refresh()
    }, [0]) 

    const showSendPg = () => {
        setShowNew(false)
        setShowSend(true)
        setShowAll(false)
        setBodyHeight(true)
        setShowDraft(false)
    }
    const showAllPg = () => {
        setShowAll(true)
        setShowNew(false)
        setShowSend(false)
        setBodyHeight(true)
        setShowDraft(false)
    }
    const showDraftPg = () => {
        setShowAll(false)
        setShowNew(false)
        setShowSend(false)
        setBodyHeight(true)
        setShowDraft(true)
    }

    const addItem = async () => {
        if (!item || !descript || !quantity || !price) {
            setShowAlert(true)
            setAlertText('All item input fields are required')
        } else {
            setDisplayItem((prev) => [...prev, {item, descript, quantity, price}])
            
            setIsItem(true)
            setItem('')
            setDescript('')
            setQuantity('')
            setPrice('')
            const comp = 'no'
            try {
                const req = await fetch('http://localhost:6001/api/fl/invoices', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({item, descript, quantity, price, comp}),
                    credentials: 'include'
                })
                if (!req.ok) {
                    const data = await req.json()
                    console.log(data)
                } 
            } catch (err) {
                console.log(err)
            }
        } 
    }

    const createInvoice = async (e) => {
        const comp = 'yes'
        if (!isItem) {
            setShowAlert(true)
            setAlertText('Add items to invoice before submitting')
        } else {
            try {
                const req = await fetch('http://localhost:6001/api/fl/invoices', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, date, dueDate, id, notes, fees: Number(fees), discount: Number(discount), coupon, comp}),
                    credentials: 'include'
                }) 
                if (!req.ok) {
                    const data = await req.json()
                    console.log(data)
                } else {
                    const data = await req.json()
                    setDisplayItems((prev) => [...prev, {invId: data.invId, name: data.name, total: data.total, stat: data.stat}])
                    setDisplayAllInvs((prev) => [...prev, {invId: data.invId, name: data.name, total: data.total, stat: data.stat}])
                    setSendPopup(data.invId)
                }
            } catch (err) {
                console.log(err)
            }
        } 
        if (!isItem) {
            e.preventDefault()
            return
        } else {
            e.preventDefault()
            setName('')
            setDate('')
            setDueDate('')
            setId('')
            setDisplayItem([])
            setShowAlert(true)
            setAlertText('Invoice created')
            setTimeout(() => {
            setShowAlert(false)
            }, 3000)
        }
    }

    const draftInvoice = async () => {
        try {
            const req = await fetch('http://localhost:6001/api/fl/draft', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, date, dueDate, id, notes, fees: Number(fees), discount: Number(discount), coupon}),
                credentials: 'include',
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                console.log(data)
                if (data.message === 'invoice drafted') {
                    setShowAlert(true)
                    setAlertText('Invoice saved, this invoice will now be in the drafts section.')
                }
                setName('')
                setId('')
                setDate('')
                setDueDate('')
                setNotes('')
                setFees('')
                setDiscount('')
                setCoupon('')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const draftArr = []
    if (loadDft) {
        draftArr.push(loadDraft.item)
    }

    function showSaveInvInfo() {
        setShowAlert(true)
        setAlertText("Once an invoice is drafted you can no longer edit the information already saved only continue from where you left off, so make sure that every input entered is your final answer before saving. If you aren't sure leave it blank and contiue later when  you're ready.")
    }

    return ( 
        <form className="invoice-page-body" style={{height: bodyHeight ? '100vh' : 'fit-content'}}>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>INVOICES</h1>
            </header>
            <WebNavbar showWebNav={showWebNav} />
            <InvPgMenuCard setShowDraftInvs={setShowDraftInvs} showSend={showSendPg} setShowSend={setShowSend} showAll={showAllPg} setShowAll={setShowAll} showNew={showNew} setShowNew={setShowNew} setBodyHeight={setBodyHeight} showDraft={showDraftPg} setShowDraft={setShowDraft}/>
            <h2 className='page-sub-titles'style={{visibility: showNew ? 'visible' : 'hidden'}}>CREATE INVOICE</h2>
            <main className="invoice-main-container" style={{display: showNew ? 'flex' : 'none'}}>
                <InvoiceInfoCard name={loadDft ? loadDraft.name : name} setName={setName} date={loadDft ? loadDraft.date : date} setDate={setDate} due={loadDft ? loadDraft.due : dueDate} setDue={setDueDate} id={loadDft ? loadDraft.invId : id} setId={setId}/>
                <TableCard title1={'ITEM'} title2={'DESCRIPT.'} title3={'QUANTITY'} title4={'PRICE'} display3={loadDft ? draftArr[0] : displayItem} tableWidth={'95%'} tableID={"item-table-body"} invNumText={'ITEM'} clientText={'DESCRIPT.'} amountText={'QUANT.'} statusText={'PRICE'}/>
                <h3 className="page-section-subtitles">Add Items To Invoice</h3>
                <fieldset className="add-items-input-cont">
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='text' placeholder="Enter item" value={item} onChange={(ev) => {setItem(ev.target.value)}}></input>
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='text' placeholder="Enter description" value={descript} onChange={(ev) => {setDescript(ev.target.value)}}></input>
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='number' placeholder="Enter quanitity" value={quantity} onChange={(ev) => {setQuantity(ev.target.value)}}></input>
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='number' placeholder="Enter price" value={price} onChange={(ev) => {setPrice(ev.target.value)}}></input>
                </fieldset>
                <button className="add-item-button" type='button' onClick={addItem}>Add Item</button>
                    <input className='invoiceExtras-inputs' type='text' placeholder='NOTES' value={loadDft ? loadDraft.notes : notes} onChange={(ev) => {setNotes(ev.target.value)}}></input>
                    <input className='invoiceExtras-inputs' type='number' placeholder='FEES' value={loadDft ? loadDraft.fees : fees} onChange={(ev) => {setFees(ev.target.value)}}></input>
                    <input className='invoiceExtras-inputs' type='number' placeholder='DISCOUNTS' value={loadDft ? loadDraft.discounts : discount} onChange={(ev) => {setDiscount(ev.target.value)}}></input>
                    <input className='invoiceExtras-inputs' type='text' placeholder='COUPONS' value={coupon} onChange={(ev) => {setCoupon(ev.target.value)}}></input>

                    <button type='button' className='MoreInfo-button' onClick={showSaveInvInfo}>i</button>
                    <button className="invoices-main-buttons" type='button' onClick={draftInvoice}>SAVE INVOICE</button>
                    <button className="invoices-main-buttons" type='submit' onClick={createInvoice}>CREATE INVOICE</button>
            </main>
            <h2 className='page-sub-titles' style={{display: showSend ? 'flex' : 'none'}}>SEND INVOICE</h2>
            <InvSubPages title1={'INVOICE'} title2={'CLIENT'} title3={'AMOUNT'} title4={'STAT'} dispItem={displayItems} setDispItem={setDisplayItems} Inv={inv} setInv={setInv} sendTo={sendTo} display={displayItems} showPage={showSend} subPageInfo={'See send invoice instructions'} subPageInfoText={'Sending invoice instructions'} infoText={"If an invoice is ready to send you can click the 'waiting' status on that invoice then follow the pop instructions."}/>
            <h2 className='page-sub-titles' style={{display: showAll ? 'flex' : 'none'}}>ALL INVOICES</h2>
            <InvSubPages title1={'INVOICE'} title2={'CLIENT'} title3={'AMOUNT'} title4={'STAT'} setInv={setInv} setDispItem={setDisplayAllInvs} display2={displayAllInvs} showPage={showAll} subPageInfo={'See more info'} subPageInfoText={'All invoices page info.'} infoText={"On this page you can view, delete or print created invoices. To view an invoice click the invoice ID, to print an invoice click the client's name and to delete an invoice click the 'status' of that invoice."}/>
            <h2 className='page-sub-titles' style={{display: showDraft ? 'flex' : 'none'}}>DRAFTED INVOICES</h2>
            <InvSubPages title1={'INVOICE'} title2={'CLIENT'} title3={'AMOUNT'} title4={'STAT'} setShowDraft={setShowDraft} setShowNew={setShowNew} setDraft={setLoadDft} setLoad={setLoadDraft} display4={showDraftInvs} setDisplay4={setShowDraftInvs} showPage={showDraft} subPageInfo={'See more info about drafted invoices'} subPageInfoText={'Drafted invoices info.'} infoText={"Here you can view all the incompleted invoices you have saved. To continue working on a draft click the invoice ID or delete invoices by clicking their statuses. Drafted invoices don't disppear on their own so remember to delete old or unwanted drafts regularly."}/>
            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText}/>

        </form>
    )
}

export default FlInvoices

// GENERATE PDF THEN ADD PRINITNG FUNCTION FOR INVOICES 
// ADD SENDING VIA EMAIL OPTION TO SEND SUB PAGE  