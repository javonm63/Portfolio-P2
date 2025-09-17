import { useEffect } from 'react';
import '../styles/fl-landing-page.css'
import {navbarHooks, searhbarHooks, showNotifHook} from "../hooks/fl-dashboardHooks.jsx";
import { showSignUpHook } from '../hooks/landingPageHooks.jsx'
import Landingbar from "../components/landingBar.jsx";
import ClInvPgMenuCard from "../components/CLinvoicePageMenu.jsx";
import LandingCard1 from '../components/flLandingCard1.jsx';
import LandingCard2 from '../components/flLandingCard2.jsx';
import LandingCard3 from '../components/flLandingCard3.jsx';
import FlSignUp from '../components/fl-signupCard.jsx'

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

    const showSendInvPg = () => {
        window.location.href = '/cl/'
    }
    const showNewInvPg = () => {
        window.location.href = '/'
    }
    const showAllInvPg = () => {
        console.log('add login popup')
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
        }
        const openSignupPg = () => {
            setShowSignup(true)
        }

    return (
        <div className='landing-page-main-cont'>
            <Landingbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">FREELANCER</h1>
            </div>
            <ClInvPgMenuCard display={display} showSend={showSendInvPg} showNewPg={showNewInvPg} showAll={showAllInvPg} submenuText1={'FREELANCER'} submenuText2={'CLIENT'} submenuText3={'LOGIN'}/>
            <LandingCard1 openSignup={openSignupPg} card1Title={'Simplify your invoicing'} card1Text={'An easy to use invoicing and billing software that connects freelancers and clients.'} card1Btn={'Sign Up'}/>
            <LandingCard2 card2Title={'Create invoices'} card2Text={'Create professional invoices in minutes with just a few clicks.'} card2Title2={'Manage clients'} card2Text2={'Add clients profiles for e-invoice features and clients management.'} card2Title3={'Track payments'} card2Text3={'Easily track which invoices aare paid, overdue, sent/emailed plus more.'} card2Title4={'Stay organized'} card2Text4={'Manage clients, invoices, payments all in one place.'}/>
            <LandingCard3 openSignup={openSignupPg}/>

            <FlSignUp openSignup={showSignup} closeSignup={closeSignup}/>
        </div>
    )
}

export default FlLandingPage