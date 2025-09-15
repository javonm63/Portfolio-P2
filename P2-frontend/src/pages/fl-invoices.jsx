import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import InvoiceInfoCard from '../components/invoiceInfoCard'
import TableCard from '../components/tableCard.jsx'
import '../styles/fl-invoices.css'
import InvPgMenuCard from "../components/invoicePageMenu.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { pageBodyHeight, showSendPage, showAllPage, showNewPage, showDraftsPage } from "../hooks/fi-invoicesHooks.jsx";

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

    return (
        <form className="invoice-page-body" style={{height: bodyHeight ? '100vh' : 'fit-content'}}>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">INVOICES</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <InvPgMenuCard showSend={showSendPg} setShowSend={setShowSend} showAll={showAllPg} setShowAll={setShowAll} showNew={showNew} setShowNew={setShowNew} setBodyHeight={setBodyHeight} showDraft={showDraftPg} setShowDraft={setShowDraft}/>
            <h2 className='page-sub-titles'style={{visibility: showNew ? 'visible' : 'hidden'}}>CREATE INVOICE</h2>
            <div className="invoice-main-container" style={{display: showNew ? 'flex' : 'none'}}>
                <InvoiceInfoCard />
                <TableCard tableWidth={'95%'} tableID={"item-table-body"} invNumText={'ITEM'} clientText={'DESCRIPTION'} amountText={'QUANTITY'} statusText={'PRICE'}/>
                <h3 className="page-section-subtitles">Add Items To Invoice</h3>
                <div className="add-items-input-cont">
                    <input className="add-item-inputs" type='text' placeholder="Enter item" required></input>
                    <input className="add-item-inputs" type='text' placeholder="Enter description" required></input>
                    <input className="add-item-inputs" type='number' placeholder="Enter quanitity" required></input>
                    <input className="add-item-inputs" type='number' placeholder="Enter price" required></input>
                </div>
                <button className="add-item-button" type='button'>Add Item</button>
                {/* <InvoiceExtras /> */}
                <input className='invoiceExtras-inputs' type='text' placeholder='NOTES'></input>
                <input className='invoiceExtras-inputs' type='text' placeholder='FEES'></input>
                <input className='invoiceExtras-inputs' type='text' placeholder='DISCOUNTS'></input>
                <input className='invoiceExtras-inputs' type='text' placeholder='COUPONS'></input>
                
                <button className="invoices-main-buttons" type='button'>SAVE INVOICE</button>
                <button className="invoices-main-buttons" type='submit'>CREATE INVOICE</button>
            </div>
            <h2 className='page-sub-titles' style={{display: showSend ? 'flex' : 'none'}}>SEND INVOICE</h2>
            <InvSubPages showSend={showSend} subPageInfo={'See send invoice instructions'} subPageInfoText={'Sending invoice instructions'} infoText={"If an invoice is ready to send you can click the 'waiting' status on that invoice then follow the pop instructions."}/>
            <h2 className='page-sub-titles' style={{display: showAll ? 'flex' : 'none'}}>ALL INVOICES</h2>
            <InvSubPages showSend={showAll} subPageInfo={'See more info'} subPageInfoText={'All invoices page info.'} infoText={"On this page you can view, delete or print created invoices. To view an invoice click the invoice ID, to print an invoice click the client's name and to delete an invoice click the 'status' of that invoice."}/>
            <h2 className='page-sub-titles' style={{display: showDraft ? 'flex' : 'none'}}>DRAFTED INVOICES</h2>
            <InvSubPages showSend={showDraft} subPageInfo={'See more info about drafted invoices'} subPageInfoText={'Drafted invoices info.'} infoText={"Here you can view all the incompleted invoices you have saved. To continue working on a draft click the invoice ID, once an invoice is loaded it's removed from the drafts page so re-save if necessary. You can also delete invoices by clicking their statuses."}/>
        </form>
    )
}

export default FlInvoices