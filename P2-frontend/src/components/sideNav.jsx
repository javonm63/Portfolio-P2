import './sideNav.css'
function SideNavBar({sideNav, setSideNav}) {
    return (
        <div className="sideNav" style={{display: sideNav ? 'flex' : 'none'}}>
            <button className='sidenav-exit-btn' onClick={() => setSideNav(false)}>X</button>
            <h3 className='sidenav-title'>MENU</h3>
            <a className='sideNav-options' href='/fl/dashboard'>DASHBOARD</a>
            <a className='sideNav-options' href='/fl/invoices'>INVOICES</a>
            <a className='sideNav-options' href='/fl/clients'>CLIENTS</a>
            <a className='sideNav-options' href='/fl/reports'>REPORTS</a>
            <a className='sideNav-options' href='/fl/notification'>NOTIFICATIONS</a>
            <a className='sideNav-options' href='/fl/settings'>SETTINGS</a>
            <a className='sideNav-options' href='/'>LOGOUT</a>
        </div>
    )
}

export default SideNavBar 