import '../styles/sideNav.css'
function LandingSideNavBar({sideNav, setSideNav, openSignup}) {
    return (
        <div className="sideNav" style={{display: sideNav ? 'flex' : 'none'}}>
            <button className='sidenav-exit-btn' onClick={() => setSideNav(false)}>X</button>
            <h3 className='sidenav-title'>MENU</h3>
            <a className='sideNav-options' href='/'>FREELANCER</a>
            <a className='sideNav-options' href='/cl'>CLIENT</a>
            <button className='sideNav-login-option' type='button' onClick={openSignup}>LOGIN</button>
        </div>
    )
}

export default LandingSideNavBar 