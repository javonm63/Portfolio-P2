import '../styles/fl-settings.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import WebNavbar from "../components/webNav.jsx";
import ProfileInfoCard from '../components/profileInfoCard.jsx';
import InvoiceSetCard from '../components/invoiceSettingsCard.jsx';
import { useEffect } from 'react';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import getCookie from '../utils/getCookie.jsx';

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
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
        })
    })
    useEffect(() => {
        async function refresh() {
            const csrfToken = getCookie('csrfToken')
            const req = await fetch('https://localhost:6001/api/fl/refresh', {
                method: 'POST',
                headers: {"x-csrf-token": `Bearer ${csrfToken}`, 'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!req.ok) {
                const data = await req.json()
                console.log(data.message)
                if (data.message === 'Unauthorized user') {
                    window.location.href = '/'
                }
            }
        }
        refresh()
    }, [])

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
                    {/* ADD TOGGLE SETTING FOR LIGHT AND DARK MODE */}
                </div>
            </div>
        </div>
    )
}

export default FlSettings