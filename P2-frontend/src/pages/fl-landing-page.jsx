import { useEffect } from 'react';
import '../styles/fl-landing-page.css'
import {navbarHooks, searhbarHooks, showNotifHook} from "../hooks/fl-dashboardHooks.jsx";
import { showSignUpHook, showLoginHook, showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import Landingbar from "../components/landingBar.jsx";
import ClInvPgMenuCard from "../components/CLinvoicePageMenu.jsx";
import LandingCard1 from '../components/flLandingCard1.jsx';
import LandingCard2 from '../components/flLandingCard2.jsx';
import LandingCard3 from '../components/flLandingCard3.jsx';
import FlSignUp from '../components/fl-signupCard.jsx'
import LoginCard from '../components/loginCard.jsx';

function FlLandingPage() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const screenHooks = searhbarHooks()
    const screenWidth = screenHooks.screenWidth
    const setScreenWidth = screenHooks.setScreenWidth

    const landingNavHooks = showNotifHook()
    const display = landingNavHooks.showNotif
    const setDisplay= landingNavHooks.setShowNotif

    const signupHooks = showSignUpHook()
    const showSignup = signupHooks.showSignup
    const setShowSignup = signupHooks.setShowSignup

    const loginHooks = showLoginHook()
    const showLogin = loginHooks.showLogin
    const setShowLogin = loginHooks.setShowLogin

    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme : dark)').matches) {
            setDarkMode(true)
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
        })
    })

    const showSendInvPg = () => {
        window.location.href = '/cl'
    }
    const showNewInvPg = () => {
        window.location.href = '/'
    }
    const showAllInvPg = () => {
        setShowLogin(true)
    }

    useEffect(() => {
            const resizeScreen = () => {setScreenWidth(window.innerWidth)}
            window.addEventListener('resize', resizeScreen)
            return () => window.removeEventListener('resize', resizeScreen)
        })
        useEffect(() => {
            if (screenWidth > 1030) {
                setShowWebNav(true)
                setDisplay(true)
                return
            } else {
                setShowWebNav(false)
                setDisplay(false)
                return
            } 
        })

        const closeSignup = () => {
            setShowSignup(false)
            setShowLogin(false)
        }
        const openSignupPg = () => {
            setShowSignup(true)
        }
        const openLoginPg = () => {
            setShowLogin(true)
            setSideNav(false)
        }

    return (
        <div className='landing-page-main-cont'>
            <Landingbar openSignup={openLoginPg} sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <span className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>FREELANCER</h1>
            </span>
            <ClInvPgMenuCard display={display} showSend={showSendInvPg} showNewPg={showNewInvPg} showAll={showAllInvPg} submenuText1={'FREELANCER'} submenuText2={'CLIENT'} submenuText3={'LOGIN'}/>
            <LandingCard1 darkMode={darkMode} openSignup={openSignupPg} card1Title={'Simplify your invoicing'} card1Text={'An easy to use invoicing and billing software that connects freelancers and clients.'} card1Btn={'Sign Up'}/>
            <LandingCard2 darkMode={darkMode} card2Title={'Create invoices'} card2Text={'Create professional invoices in minutes with just a few clicks.'} card2Title2={'Manage clients'} card2Text2={'Add clients profiles for e-invoice features and clients management.'} card2Title3={'Track payments'} card2Text3={'Easily track which invoices aare paid, overdue, sent/emailed plus more.'} card2Title4={'Stay organized'} card2Text4={'Manage clients, invoices, payments all in one place.'}/>
            <LandingCard3 darkMode={darkMode} graphLabel={'Monthly Earnings'} openSignup={openSignupPg} landingCard3Text={'You can also view insights about your invoices and clients such as paid vs unpaid invoices, monthly earnings, outstanding balances etc.'}/>

            <FlSignUp openSignup={showSignup} closeSignup={closeSignup}/>
            <LoginCard showSignup={showLogin} closeSignup={closeSignup} />
        </div>
    )
}

export default FlLandingPage    

// AUTOMATIC TOKEN REFRESH ASIDE FROM ON PAGE REFRESHES
// because if a user stays on a page for more than 15mins the api calls gets blocked due to the page no refreshed