import '../styles/cl-invoices.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import ClWebNavbar from "../components/clWebNav.jsx";
import InvSubPages from "../components/invoicesSubPages.jsx";
import { showSendPage2, showSendPage, showAllPage } from "../hooks/fi-invoicesHooks.jsx";
import ClInvPgMenuCard from '../components/CLinvoicePageMenu.jsx';

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

    const showNewInvPg = () => {
        setShowNew(true)
        setShowSend(false)
        setShowAll(false)
    }
    const showSendInvPg = () => {
        setShowSend(true)
        setShowNew(false)
        setShowAll(false)
    }
    const showAllInvPg = () => {
        setShowAll(true)
        setShowNew(false)
        setShowSend(false)
    }

    return (
        <div className='cl-invoices-page-container'>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">INVOICES</h1>
            </div>
            <ClWebNavbar showWebNav={showWebNav} />
            <ClInvPgMenuCard showSend={showNewInvPg} showNew={showSendInvPg} showAll={showAllInvPg}/>
            <h3 className='page-sub-titles' style={{display: showNew ? 'flex' : 'none'}}>NEW INVOICES</h3>
            <h3 className='page-sub-titles' style={{display: showSend ? 'flex' : 'none'}}>SEND INVOICE</h3>
            <h3 className='page-sub-titles' style={{display: showAll ? 'flex' : 'none'}}>ALL INVOICES</h3>
            <div className="clInvs-page-container">
                <InvSubPages showSend={showNew} subPageInfo={'See more info'} subPageInfoText={'New invoices info.'} infoText={"This page allows you to pay for invoices by clicking the invoice ID."}/>
                <InvSubPages showSend={showSend} subPageInfo={'See more info'} subPageInfoText={'Sending invoices info.'} infoText={"Here you can view or print paid/saved invoices, to view click the invoice ID or to print click the invoice status."}/>
                <InvSubPages showSend={showAll} subPageInfo={'See more info'} subPageInfoText={'All invoices info.'} infoText={"All the invoices that comes to your account is saved here regardless if the invoice is paid or unpaid."}/>
            </div>
        </div>
    )
}

export default ClInvoices