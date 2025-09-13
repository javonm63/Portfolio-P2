import { useEffect, useState } from "react";
import Searchbar from "../components/searchbar.jsx";
import './fl-dashboard.css'
import WebNavbar from "../components/webNav.jsx";
import Card from "../components/card.jsx";

function FlDashboard() {
    const [showWebNav, setShowWebNav] = useState(false)

    return (
        <div className="dashboard-page-container">
            <Searchbar setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">DASHBOARD</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <div className="cards-container">
                <Card cardTitle={"EARNINGS"} cardText={'$0'}/>
                <Card cardTitle={"OUTSTANDING"} cardText={'0'}/>
            </div>
        </div>
    )
}

export default FlDashboard 