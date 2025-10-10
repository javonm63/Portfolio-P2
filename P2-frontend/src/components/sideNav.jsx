import '../styles/sideNav.css'
function SideNavBar({sideNav, setSideNav, openNotifPg}) {
    const logout = async () => {
        const req = await fetch('http://localhost:6001/api/fl/logout', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if (!req.ok) {
            const error = await req.json()
            console.log(error)
        } else {
            const data = await req.json()
            console.log(data)
            sessionStorage.removeItem('role')
            window.location.href = '/'
        }
    } 
    return (
        <nav className="sideNav" style={{display: sideNav ? 'flex' : 'none'}}>
            <button className='sidenav-exit-btn' onClick={() => setSideNav(false)}>X</button>
            <h3 className='sidenav-title'>MENU</h3>
            <a className='sideNav-options' href='/fl/dashboard'>DASHBOARD</a>
            <a className='sideNav-options' href='/fl/invoices'>INVOICES</a>
            <a className='sideNav-options' href='/fl/clients'>CLIENTS</a>
            <a className='sideNav-options' href='/fl/reports'>REPORTS</a>
            <button id="sideNav-notif-btn" className='sideNav-options' type="button" onClick={openNotifPg}>NOTIFICATIONS</button>
            <a className='sideNav-options' href='/fl/settings'>SETTINGS</a>
            <button id="sideNav-logout-btn" className='sideNav-options' type='button' onClick={logout}>LOGOUT</button>
        </nav>
    )
}
 
export default SideNavBar 