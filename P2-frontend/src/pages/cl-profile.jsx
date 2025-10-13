import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import ClWebNavbar from "../components/clWebNav.jsx";
import ProfileInfoCard from '../components/profileInfoCard.jsx';
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import { companyInfoHooks, settingsHooks, settingsProfileHooks } from '../hooks/fl-settingHooks.jsx';
import { settingsAppHooks } from '../hooks/fl-settingHooks'
import getCookie from '../utils/getCookie.jsx';
import { useEffect } from "react";
import SettingsEditCard from '../components/settingsEditCard.jsx';
import SettingsEditCard2 from '../components/settingsEditCard2.jsx';
import { displayHooks } from "../hooks/cl-hooks.jsx";
import InvoiceSetCard from "../components/invoiceSettingsCard.jsx";

function ClProfile() {
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

    const settingsHook = settingsAppHooks()
    const on = settingsHook.on
    const setOn = settingsHook.setOn

    const clientHook = displayHooks()
    const client = clientHook.client
    const setClient = clientHook.setClient

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
            const req = await fetch('http://localhost:6001/api/cl/refresh', {
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
            setClient(true)

            try {
                const profileReq = await fetch('http://localhost:6001/api/cl/settings', {
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
                    if (database2.street === 'no profile') {
                        return
                    }
                    const addr = String(`${database2.street}, ${database2.city}, ${database2.state}, ${database2.zip} `)
                    setAddress(addr)
                    setCard(database2.num)
                }
            } catch (err) {
                console.log(err)
            }
            // try {
            //     const notifReq = await fetch('http://localhost:6001/api/fl/notifications', {
            //         method: 'GET',
            //         headers: {'Content-Type': 'application/json'},
            //         credentials: 'include',
            //     })
            //     if (!notifReq.ok) {
            //         const error = await notifReq.json()
            //         console.log(error)
            //     } else {
            //         const notifsDataArr = []
            //         const notifsArr = []
            //         const data = await notifReq.json()
            //         const database = data.data
            //         if (database) {
            //             for (const [key, value] of Object.entries(database)) {
            //                 notifsDataArr.push(value)
            //             }
            //             notifsDataArr.forEach((notifObj) => {
            //                 const when = notifObj.when
            //                 const timeAgo = (when) => {
            //                     const now = new Date()
            //                     const then = new Date(when)
            //                     const diffMs = now - then
            //                     const diffMins = Math.floor(diffMs / (1000 * 60))
            //                     const diffHrs = Math.floor(diffMs / 60)
            //                     const diffDays = Math.floor(diffMs / 24)
            //                     if (diffMins < 1) {
            //                         return 'Just now'
            //                     }
            //                     if (diffMins < 60) {
            //                         return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
            //                     }
            //                     if (diffMins < 24) {
            //                         return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`
            //                     }
            //                     return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
            //                 }
            //                 const whenNotif = timeAgo(when)
            //                 const newNotif = notifObj.notif 
            //                 notifsArr.push({newNotif, whenNotif})
            //                 setDispNalert(true)
            //             })
            //             setDispNotifs([...notifsArr])
            //         }
            //     }
            // } catch (err) {
            //     console.log(err)
            // }
        }
        refresh()
    }, [])

    const toggleDarkMode = () => {
        setOn(!on)
        if(on) {
            setDarkMode(false)
            sessionStorage.setItem('darkMode', JSON.stringify(false))
        } else {
            setDarkMode(true)
            sessionStorage.setItem('darkMode', JSON.stringify(true))
        }
    }
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
                    <input className='settingsProfile-inputs' type='text' value={name} readOnly></input>
                    <input className='settingsProfile-inputs' type='email' value={email} readOnly></input>
                    <input className='settingsProfile-inputs' type='number' value={phone} readOnly></input>
                    <input className='settingsProfile-inputs' type='text' placeholder='**********' readOnly></input>
                    <button className='edit-profile-button' type='button' onClick={() => setDisplay(true)}>Edit Profile</button>
                </fieldset>
                <h3 className='settings-page-subTitles'>Personal Info</h3>
                <article className='companyInfo-container'>
                    <ProfileInfoCard addres={address} cardNum={card} placeHolderText={'IMAGE'}/>
                </article>
                <button className='edit-profile-button' type='button' onClick={() => setDisplay2(true)}>Edit Personal</button>
                <h3 className='settings-page-subTitles'>Invoice Settings</h3>
                <div className='appSettings-container'>
                    <InvoiceSetCard client={client} on={on} toggleDarkMode={toggleDarkMode} />
                   {/* ADD THE APP SETTINGS FOR CLIENT SIDE  */}
                </div>
            </form>
            <SettingsEditCard client={client} title={'EDIT PROFILE INFO.'} display={display} setDisplay={setDisplay} setName={setName} setEmail={setEmail} setPhone={setPhone} setPass={setPass}/>
            <SettingsEditCard2 client={client} title={'EDIT PERSONAL INFO.'} title2={'EDIT PAYMENT INFO.'} display={display2} setDisplay={setDisplay2}/>
        </div>
    )
}

export default ClProfile