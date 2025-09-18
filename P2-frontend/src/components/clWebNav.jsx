import '../styles/webNav.css'

function ClWebNavbar({showWebNav, darkMode}) {

return (
    <nav className={darkMode ? "webNav-container dark" : "webNav-container"} style={{display: showWebNav ? 'flex' : 'none'}}>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/cl/dashboard">DASHBOARD</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/cl/invoices">INVOICES</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/cl/reports">REPORTS</a>
        <a className={darkMode ? "webNav-options dark" : "webNav-options"} href="/cl/profile">PROFILE</a>
    </nav>
)
}
export default ClWebNavbar