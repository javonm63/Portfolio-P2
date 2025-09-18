import { useEffect } from 'react';
import '../styles/fl-landing-page.css'
import {navbarHooks, searhbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import { showSignUpHook, showLoginHook } from '../hooks/landingPageHooks.jsx'
import Landingbar from "../components/landingBar.jsx";
import ClInvPgMenuCard from "../components/CLinvoicePageMenu.jsx";
import LandingCard1 from '../components/flLandingCard1.jsx';
import LandingCard2 from '../components/flLandingCard2.jsx';
import LandingCard3 from '../components/flLandingCard3.jsx';
import ClSignUp from '../components/cl-signupCard.jsx'
import LoginCard from '../components/loginCard.jsx';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx';

function ClLandingPage() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const screenHooks = searhbarHooks()
    const screenWidth = screenHooks.screenWidth
    const setScreenWidth = screenHooks.setScreenWidth 

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
    useEffect(() => {
            const resizeScreen = () => {setScreenWidth(window.innerWidth)}
            window.addEventListener('resize', resizeScreen)
            return () => window.removeEventListener('resize', resizeScreen)
        })
        useEffect(() => {
            if (screenWidth > 1030) {
                setShowWebNav(true)
                return
            } else {
                setShowWebNav(false)
                return
            } 
        })

    return (
        <div className='landing-page-main-cont'>
            <Landingbar openSignup={openLoginPg} sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>CLIENT</h1>
            </div>
            <ClInvPgMenuCard showSend={showSendInvPg} showNewPg={showNewInvPg} showAll={showAllInvPg} submenuText1={'FREELANCER'} submenuText2={'CLIENT'} submenuText3={'LOGIN'}/>
            <LandingCard1 darkMode={darkMode} openSignup={openSignupPg} card1Title={'Invoice and manage payments.'} card1Text={'The simple way to recieve, pay and organize invoices.'} card1Btn={'Get Started'}/>
            <LandingCard2 darkMode={darkMode} card2Title={'Recieve invoices'} card2Text={'Recieve electronic invoices from freelancers via email or directly through the freelancerInnvoice.com website.'} card2Title2={'Pay Invoices'} card2Text2={'You can pay an invoice once it has been recieved either from your FLI.com account, email or in person.'} card2Title3={'Save Invoices'} card2Text3={'Invoices can also be saved to, or deleted from your account; making managing invoices way more organized.'} card2Title4={'Manage Freelancers'} card2Text4={'The previous freelancers page in where all the freelancers that have sent you invoices will be stored.'}/>
            <LandingCard3 darkMode={darkMode} graphLabel={'Paid vs Unpaid'} openSignup={openSignupPg} landingCard3Text={'You can view insights about your invoices, payments and merchants. Some of these insights are: paid vs unpaid invoices, recently paid invoice, overdue or outstanding invoices etc.'}/> 

            <ClSignUp openSignup={showSignup} closeSignup={closeSignup}/>
            <LoginCard showSignup={showLogin} closeSignup={closeSignup}/>
        </div>
    )
}

export default ClLandingPage