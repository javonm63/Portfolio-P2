import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import Card from "../components/card.jsx";


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
            <WebNavbar showWebNav={showWebNav} />
            <div className="cards-container">
                <Card cardTitle={"UNPAID"} cardText={'0'}/>
                <Card cardTitle={"OUTSTANDING"} cardText={'0'}/>
            </div>
        </div>
    )
}

export default ClDashboard
