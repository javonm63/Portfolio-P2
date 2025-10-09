import '../styles/fl-settings.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import WebNavbar from "../components/webNav.jsx";
import ProfileInfoCard from '../components/profileInfoCard.jsx';
import InvoiceSetCard from '../components/invoiceSettingsCard.jsx';
import { useEffect } from 'react';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import getCookie from '../utils/getCookie.jsx';
import SettingsEditCard from '../components/settingsEditCard.jsx';
import SettingsEditCard2 from '../components/settingsEditCard2.jsx';
import { companyInfoHooks, settingsHooks, settingsProfileHooks } from '../hooks/fl-settingHooks.jsx';

function FlSettings() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    const settingHook = settingsHooks()
    const display = settingHook.display 
    const setDisplay = settingHook.setDisplay
    const display2 = settingHook.display2 
    const setDisplay2 = settingHook.setDisplay2

    const profileHooks = settingsProfileHooks()
    const name = profileHooks.name
    const setName = profileHooks.setName
    const email = profileHooks.email
    const setEmail = profileHooks.setEmail
    const phone = profileHooks.phone
    const setPhone = profileHooks.setPhone
    const pass = profileHooks.pass
    const setPass = profileHooks.setPass

    const companyHook = companyInfoHooks()
    const address = companyHook.address
    const setAddress = companyHook.setAddress
    const card = companyHook.card
    const setCard = companyHook.setCard

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
            const req = await fetch('http://localhost:6001/api/fl/refresh', {
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

            try {
                const profileReq = await fetch('http://localhost:6001/api/fl/settings', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                })
                if (!profileReq.ok) {
                    const error = await profileReq.json()
                    console.log(error)
                } else {
                    const data = await profileReq.json()
                    const database = data.rest
                    setName(database.name)
                    setEmail(database.email)
                    setPhone(database.phone)
                    const database2 = data.rest2
                    const addr = String(`${database2.street}, ${database2.city}, ${database2.state}, ${database2.zip} `)
                    setAddress(addr)
                    setCard(database2.num)
                }
            } catch (err) {
                console.log(err)
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
                    <input className='settingsProfile-inputs' type='text' value={name} readOnly></input>
                    <input className='settingsProfile-inputs' type='email' value={email} readOnly></input>
                    <input className='settingsProfile-inputs' type='number' value={phone} readOnly></input>
                    <input className='settingsProfile-inputs' type='text' placeholder='**********' readOnly></input>
                    <button className='edit-profile-button' type='button' onClick={() => setDisplay(true)}>Edit Profile</button>
                </div>
                <h3 className='settings-page-subTitles'>Company Info</h3>
                <div className='companyInfo-container'>
                    <ProfileInfoCard addres={address} cardNum={card} placeHolderText={'LOGO'}/>
                </div>
                <button className='edit-profile-button' type='button' onClick={() => setDisplay2(true)}>Edit Company</button>
                <h3 className='settings-page-subTitles'>Invoice Settings</h3>
                <div className='appSettings-container'>
                    <InvoiceSetCard />
                    {/* ADD APP SETTINGS FOR FREELANCER SIDE */}
                </div>
            </div>
            <SettingsEditCard title={'EDIT PROFILE INFO.'} display={display} setDisplay={setDisplay} setName={setName} setEmail={setEmail} setPhone={setPhone} setPass={setPass}/>
            <SettingsEditCard2 title={'EDIT COMPANY INFO.'} title2={'EDIT PAYMENT INFO.'} display={display2} setDisplay={setDisplay2}/>
        </div>
    )
}

export default FlSettings