import '../styles/webNav.css'

function WebNavbar({showWebNav, darkMode}) {
return (
    <nav className={darkMode ? "webNav-container dark" : "webNav-container"} style={{display: showWebNav ? 'flex' : 'none'}}>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/fl/dashboard">DASHBOARD</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/fl/invoices">INVOICES</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/fl/clients">CLIENTS</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/fl/reports">REPORTS</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/fl/settings">PROFILE</a>
    </nav>
)
}
export default WebNavbar