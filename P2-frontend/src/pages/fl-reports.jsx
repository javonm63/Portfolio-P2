import '../styles/fl-reports.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import WebNavbar from "../components/webNav.jsx";
import ReportsGraphCard from '../components/reportsGraphCard.jsx';
import PieGraphCard from '../components/pieGraph.jsx';
import TotalsCard from '../components/reportsTotalsCard.jsx';

function FlReports() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    return (
        <div className='flReports-page-container'>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">REPORTS</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <div className='reports-subtitles-container'>
                <h2 id="monthly-title" className="reports-page-sub-titleL">MONTHLY EARNINGS</h2>
                <h2 id="PvsUP-title" className="reports-page-sub-titleR">PAID VS. UNPAID</h2>
            </div>
            <div className='reports-main-container'>
                <div className='reports-left-container'>
                    <ReportsGraphCard gaphLabel={"Monthly Earnings"}/>
                </div>
                <div className='reports-right-container'>
                    <PieGraphCard />
                </div>
            </div>
            <TotalsCard />
        </div>
    )
}

export default FlReports