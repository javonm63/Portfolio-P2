import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import InvoiceInfoCard from '../components/invoiceInfoCard'
import TableCard from '../components/tableCard.jsx'
import '../styles/fl-invoices.css'
import InvPgMenuCard from "../components/invoicePageMenu.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { pageBodyHeight, showSendPage, showAllPage, showNewPage, showDraftsPage } from "../hooks/fi-invoicesHooks.jsx";
import { useEffect } from "react";
import { showDarkModeHook } from "../hooks/landingPageHooks.jsx";
import { flInvoicesHooks, showAlertHooks } from "../hooks/fl-apiHooks.jsx";
import MoreInfo from "../utils/moreInfo.jsx";

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

    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const alertText = alertHooks.alertText
    const setAlertText = alertHooks.setAlertText


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
            console.log(item, descript, quantity, price)
            setDisplayItem((prev) => [...prev, {item, descript, quantity, price}])
            setIsItem(true)
            setItem('')
            setDescript('')
            setQuantity('')
            setPrice('')
            console.log(displayItem)
            const comp = 'no'
            try {
                const req = await fetch('https://localhost:6001/api/fl/invoices', {
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

    const createInvoice = async () => {
        console.log(name, date, dueDate, id, notes, fees, discount, coupon)
        const comp = 'yes'
        if (!isItem) {
            setShowAlert(true)
            setAlertText('Add items to invoice before submitting')
        } else {
            try {
                const req = await fetch('https://localhost:6001/api/fl/invoices', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, date, dueDate, id, notes, fees: Number(fees), discount: Number(discount), coupon, comp}),
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
    const handleSubmit = (e) => {
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

    return ( 
        <form onSubmit={handleSubmit} className="invoice-page-body" style={{height: bodyHeight ? '100vh' : 'fit-content'}}>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>INVOICES</h1>
            </header>
            <WebNavbar showWebNav={showWebNav} />
            <InvPgMenuCard showSend={showSendPg} setShowSend={setShowSend} showAll={showAllPg} setShowAll={setShowAll} showNew={showNew} setShowNew={setShowNew} setBodyHeight={setBodyHeight} showDraft={showDraftPg} setShowDraft={setShowDraft}/>
            <h2 className='page-sub-titles'style={{visibility: showNew ? 'visible' : 'hidden'}}>CREATE INVOICE</h2>
            <main className="invoice-main-container" style={{display: showNew ? 'flex' : 'none'}}>
                <InvoiceInfoCard name={name} setName={setName} date={date} setDate={setDate} due={dueDate} setDue={setDueDate} id={id} setId={setId}/>
                <TableCard display={displayItem} tableWidth={'95%'} tableID={"item-table-body"} invNumText={'ITEM'} clientText={'DESCRIPTION'} amountText={'QUANTITY'} statusText={'PRICE'}/>
                <h3 className="page-section-subtitles">Add Items To Invoice</h3>
                <fieldset className="add-items-input-cont">
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='text' placeholder="Enter item" value={item} onChange={(ev) => {setItem(ev.target.value)}}></input>
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='text' placeholder="Enter description" value={descript} onChange={(ev) => {setDescript(ev.target.value)}}></input>
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='number' placeholder="Enter quanitity" value={quantity} onChange={(ev) => {setQuantity(ev.target.value)}}></input>
                    <input className={darkMode ? "add-item-inputs dark" : "add-item-inputs"} type='number' placeholder="Enter price" value={price} onChange={(ev) => {setPrice(ev.target.value)}}></input>
                </fieldset>
                <button className="add-item-button" type='button' onClick={addItem}>Add Item</button>
                    <input className='invoiceExtras-inputs' type='text' placeholder='NOTES' value={notes} onChange={(ev) => {setNotes(ev.target.value)}}></input>
                    <input className='invoiceExtras-inputs' type='number' placeholder='FEES' value={fees} onChange={(ev) => {setFees(ev.target.value)}}></input>
                    <input className='invoiceExtras-inputs' type='number' placeholder='DISCOUNTS' value={discount} onChange={(ev) => {setDiscount(ev.target.value)}}></input>
                    <input className='invoiceExtras-inputs' type='text' placeholder='COUPONS' value={coupon} onChange={(ev) => {setCoupon(ev.target.value)}}></input>
                    
                    <button className="invoices-main-buttons" type='button'>SAVE INVOICE</button>
                    <button className="invoices-main-buttons" type='submit' onClick={createInvoice}>CREATE INVOICE</button>
            </main>
            <h2 className='page-sub-titles' style={{display: showSend ? 'flex' : 'none'}}>SEND INVOICE</h2>
            <InvSubPages showPage={showSend} subPageInfo={'See send invoice instructions'} subPageInfoText={'Sending invoice instructions'} infoText={"If an invoice is ready to send you can click the 'waiting' status on that invoice then follow the pop instructions."}/>
            <h2 className='page-sub-titles' style={{display: showAll ? 'flex' : 'none'}}>ALL INVOICES</h2>
            <InvSubPages showPage={showAll} subPageInfo={'See more info'} subPageInfoText={'All invoices page info.'} infoText={"On this page you can view, delete or print created invoices. To view an invoice click the invoice ID, to print an invoice click the client's name and to delete an invoice click the 'status' of that invoice."}/>
            <h2 className='page-sub-titles' style={{display: showDraft ? 'flex' : 'none'}}>DRAFTED INVOICES</h2>
            <InvSubPages showPage={showDraft} subPageInfo={'See more info about drafted invoices'} subPageInfoText={'Drafted invoices info.'} infoText={"Here you can view all the incompleted invoices you have saved. To continue working on a draft click the invoice ID, once an invoice is loaded it's removed from the drafts page so re-save if necessary. You can also delete invoices by clicking their statuses."}/>
            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText}/>
        </form>
    )
}

export default FlInvoices