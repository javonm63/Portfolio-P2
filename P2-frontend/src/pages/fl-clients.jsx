import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import '../styles/fl-clients.css'
import InvSubPages from "../components/invoicesSubPages.jsx";
import NewClientInfo from "../components/newClientCard.jsx";

function FlClients() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    return ( 
        <div className="clients-page-container">
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">CLIENTS</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <h2 className="page-sub-titles">ADD NEW CLIENT</h2>
            <NewClientInfo />
            <button className="addNewClient-button">Add Client</button>
            <h2 className="page-sub-titles">YOUR CLIENTS</h2>
            <div className='clients-sub-page-container'>

            </div>
        </div>
    )
}

export default FlClients