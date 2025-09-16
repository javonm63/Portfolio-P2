import '../styles/sideNav.css'
function ClSideNavBar({sideNav, setSideNav, openNotifPg}) {
    return (
        <div className="sideNav" style={{display: sideNav ? 'flex' : 'none'}}>
            <button className='sidenav-exit-btn' onClick={() => setSideNav(false)}>X</button>
            <h3 className='sidenav-title'>MENU</h3>
            <a className='sideNav-options' href='/cl/dashboard'>DASHBOARD</a>
            <a className='sideNav-options' href='/cl/invoices'>INVOICES</a>
            <a className='sideNav-options' href='/cl/reports'>REPORTS</a>
            <button id="sideNav-notif-btn" className='sideNav-options' type="button" onClick={openNotifPg}>NOTIFICATIONS</button>
            <a className='sideNav-options' href='/cl/settings'>SETTINGS</a>
            <a className='sideNav-options' href='/'>LOGOUT</a>
        </div>
    )
}

export default ClSideNavBar 