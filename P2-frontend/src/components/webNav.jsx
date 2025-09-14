import './webNav.css'

function WebNavbar({showWebNav}) {
return (
    <nav className="webNav-container" style={{display: showWebNav ? 'flex' : 'none'}}>
        <a className="webNav-options" href="/fl/dashboard">DASHBOARD</a>
        <a className="webNav-options" href="/fl/invoices">INVOICES</a>
        <a className="webNav-options" href="/fl/clients">CLIENTS</a>
        <a className="webNav-options" href="/fl/reports">REPORTS</a>
        <a className="webNav-options" href="/fl/profile">PROFILE</a>
    </nav>
)
}
export default WebNavbar