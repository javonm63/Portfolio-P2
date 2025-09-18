import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import ClWebNavbar from "../components/clWebNav.jsx";
import ProfileInfoCard from '../components/profileInfoCard.jsx';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import { useEffect } from "react";

function ClProfile() {
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
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
        })
    })
    return (
        <div>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>PROFILE/SETTINGS</h1>
            </header>
            <ClWebNavbar showWebNav={showWebNav} />
            <form className='settings-page-main-container'>
                <h3 className='settings-page-subTitles'>Profile Info</h3>
                <fieldset className='profile-container'>
                    <input className='settingsProfile-inputs' type='text' placeholder='John Doe'readOnly></input>
                    <input className='settingsProfile-inputs' type='email' placeholder='JohnDoe12@email.com' readOnly></input>
                    <input className='settingsProfile-inputs' type='number' placeholder='347-123-4567' readOnly></input>
                    <input className='settingsProfile-inputs' type='text' placeholder='**********' readOnly></input>
                    <button className='edit-profile-button' type='button'>Edit Profile</button>
                </fieldset>
                <h3 className='settings-page-subTitles'>Personal Info</h3>
                <article className='companyInfo-container'>
                    <ProfileInfoCard placeHolderText={'IMAGE'}/>
                </article>
                <button className='edit-profile-button' type='button'>Edit Company</button>
                <h3 className='settings-page-subTitles'>Invoice Settings</h3>
                <div className='appSettings-container'>
                   {/* ADD THE APP SETTINGS FOR CLIENT SIDE  */}
                </div>
            </form>
        </div>
    )
}

export default ClProfile