import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import InvoiceInfoCard from '../components/invoiceInfoCard'
import TableCard from '../components/tableCard.jsx'
import '../styles/fl-invoices.css'
import InvPgMenuCard from "../components/invoicePageMenu.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { showSendPage } from "../hooks/fi-invoicesHooks.jsx";

function FlInvoices() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const sendpageHook = showSendPage()
    const showSend = sendpageHook.showSend
    const setShowSend = sendpageHook.setShowSend

    const showSendPg = () => {
        setShowSend(true)
    }

    return (
        <form className="invoice-page-body" style={{height: showSend ? '100vh' : 'fit-content'}}>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">INVOICES</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <InvPgMenuCard showSend={showSendPg} setShowSend={setShowSend}/>
            <h2 className='page-sub-titles'style={{visibility: showSend ? 'hidden' : 'visible'}}>CREATE INVOICE</h2>
            <div className="invoice-main-container" style={{display: showSend ? 'none' : 'flex'}}>
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
            <h2 className='page-sub-titles' style={{visibility: showSend ? 'visible' : 'hidden'}}>SEND INVOICE</h2>
            <InvSubPages showSend={showSend} subPageInfo={'See send invoice instructions'}/>
        </form>
    )
}

export default FlInvoices