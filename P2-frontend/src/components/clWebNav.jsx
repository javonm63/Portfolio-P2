import '../styles/webNav.css'

function ClWebNavbar({showWebNav}) {
return (
    <nav className="webNav-container" style={{display: showWebNav ? 'flex' : 'none'}}>
        <a className="webNav-options" href="/cl/dashboard">DASHBOARD</a>
        <a className="webNav-options" href="/cl/invoices">INVOICES</a>
        <a className="webNav-options" href="/cl/reports">REPORTS</a>
        <a className="webNav-options" href="/cl/settings">PROFILE</a>
    </nav>
)
}
export default ClWebNavbar