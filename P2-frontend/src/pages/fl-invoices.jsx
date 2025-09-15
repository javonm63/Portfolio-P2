import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import InvoiceInfoCard from '../components/invoiceInfoCard'
import '../styles/fl-invoices.css'

function FlInvoices() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav
    return (
        <div>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">INVOICES</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <h2 className='page-sub-titles'>CREATE INVOICE</h2>
            <div className="invoice-main-container">
                <InvoiceInfoCard />
            </div>
        </div>
    )
}

export default FlInvoices