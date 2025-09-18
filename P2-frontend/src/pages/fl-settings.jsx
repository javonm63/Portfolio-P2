import '../styles/fl-settings.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import WebNavbar from "../components/webNav.jsx";
import ProfileInfoCard from '../components/profileInfoCard.jsx';
import InvoiceSetCard from '../components/invoiceSettingsCard.jsx';
import { useEffect } from 'react';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'

function FlSettings() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme : dark)').matches) {
            setDarkMode(true)
        }
    })

    return (
        <div className='flSettings-page-container'>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>PROFILE/SETTINGS</h1>
            </div>
            <WebNavbar showWebNav={showWebNav} />
            <div className='settings-page-main-container'>
                <h3 className='settings-page-subTitles'>Profile Info</h3>
                <div className='profile-container'>
                    <input className='settingsProfile-inputs' type='text' placeholder='John Doe'readOnly></input>
                    <input className='settingsProfile-inputs' type='email' placeholder='JohnDoe12@email.com' readOnly></input>
                    <input className='settingsProfile-inputs' type='number' placeholder='347-123-4567' readOnly></input>
                    <input className='settingsProfile-inputs' type='text' placeholder='**********' readOnly></input>
                    <button className='edit-profile-button' type='button'>Edit Profile</button>
                </div>
                <h3 className='settings-page-subTitles'>Company Info</h3>
                <div className='companyInfo-container'>
                    <ProfileInfoCard placeHolderText={'LOGO'}/>
                </div>
                <button className='edit-profile-button' type='button'>Edit Company</button>
                <h3 className='settings-page-subTitles'>Invoice Settings</h3>
                <div className='appSettings-container'>
                    <InvoiceSetCard />
                    {/* ADD APP SETTINGS FOR FREELANCER SIDE */}
                </div>
            </div>
        </div>
    )
}

export default FlSettings