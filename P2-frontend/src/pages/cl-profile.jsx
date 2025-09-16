import '../styles/cl-profile.css'
import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar.jsx";
import ClWebNavbar from "../components/clWebNav.jsx";

function ClProfile() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav
    return (
        <div>
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <div className="page-title-container">
                <h1 className="page-titles">PROFILE/SETTINGS</h1>
            </div>
            <ClWebNavbar showWebNav={showWebNav} />
            <div className='settings-page-main-container'>
                <h3 className='settings-page-subTitles'>Profile Info</h3>
                <div className='profile-container'>
                    <input className='settingsProfile-inputs' type='text' placeholder='John Doe'readOnly></input>
                    <input className='settingsProfile-inputs' type='email' placeholder='JohnDoe12@email.com' readOnly></input>
                    <input className='settingsProfile-inputs' type='number' placeholder='347-123-4567' readOnly></input>
                    <input className='settingsProfile-inputs' type='text' placeholder='**********' readOnly></input>
                    <button className='edit-profile-button' type='button'>Edit Profile</button>
                </div>
            </div>
        </div>
    )
}

export default ClProfile