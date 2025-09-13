import { useEffect, useState } from "react";
import Searchbar from "../components/searchbar.jsx";
import './fl-dashboard.css'
import WebNavbar from "../components/webNav.jsx";

function FlDashboard() {
    const [showWebNav, setShowWebNav] = useState(false)

    return (
        <div className="dashboard-page-container">
            <Searchbar setShowWebNav={setShowWebNav} />
            <WebNavbar showWebNav={showWebNav} />
        </div>
    )
}

export default FlDashboard