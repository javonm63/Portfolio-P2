import '../styles/cl-dashboard.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import ClWebNavbar from "../components/clWebNav.jsx";
import Card from "../components/card.jsx";
import TableCard from "../components/tableCard.jsx";
import QaCard from "../components/qaCard.jsx";
import PieGraphCard from '../components/pieGraph.jsx';
import ReportsGraphCard from '../components/reportsGraphCard.jsx';


function ClDashboard() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    return (
        <div className="dashboard-page-container">
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">DASHBOARD</h1>
            </div>
            <ClWebNavbar showWebNav={showWebNav} />
            <div className="cards-container">
                <Card cardTitle={"UNPAID"} cardText={'0'}/>
                <Card cardTitle={"OUTSTANDING"} cardText={'0'}/>
            </div>
            <TableCard tableWidth={'90vw'} pageSubTitle={"INVOICE STATUS"} tableID={"cl-home-table-body"} invNumText={'INVOICE'} clientText={'DATE'} amountText={'AMOUNT'} statusText={'STATUS'}/>
            <h2 className='page-sub-titles'>QUICK ACTIONS</h2>
            <div className="cl-quickActions-container">
                <QaCard qaCardTitle={'INVOICES'} qaBtnText={'SEE INVOICES'} qaCardHref={'/Cl/invocies'} qaLinkText={'PAY INVOICE'} />  
            </div>
            <div className="page-sub-title-cont">
                <h3 className="page-sub-titles">YOUR STATS</h3>
            </div>
            <div className='yourStats-main-container'>
                <div className='reports-left-container'>
                    <ReportsGraphCard graphLabel={"Overdue per Month"}/>
                </div>
                <div className='reports-right-container'>
                    <PieGraphCard />
                </div>
            </div>
        </div>
    )
}

export default ClDashboard
