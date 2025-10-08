import { showAlertHooks } from '../hooks/fl-apiHooks'
import { settingsProfileEditHooks } from '../hooks/fl-settingHooks'
import '../styles/settingsEditCard.css'
import MoreInfo from '../utils/moreInfo'

function SettingsEditCard({title, display, setDisplay, setName, setEmail, setPhone, setPass}) {
    const closePopUp = () => {
        setDisplay(false)
    }

    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const alertTitle = alertHooks.alertTitle
    const setAlertTitle = alertHooks.setAlertTitle
    const alertText = alertHooks.alertText
    const setAlertText = alertHooks.setAlertText

    const editHooks = settingsProfileEditHooks()
    const editName = editHooks.name
    const setEditName = editHooks.setName
    const editEmail = editHooks.email
    const setEditEmail = editHooks.setEmail
    const editPhone = editHooks.phone
    const setEditPhone = editHooks.setPhone
    const editPass = editHooks.pass
    const setEditPass = editHooks.setPass

    const nameChange = (e) => {
        setEditName(e.target.value)
    }
    const emailChange = (e) => {
        setEditEmail(e.target.value)
    }
    const phoneChange = (e) => {
        setEditPhone(e.target.value)
    }
    const passChange = (e) => {
        setEditPass(e.target.value)
    }

    const updateProfile = async () => {
        if (editName === '' && editEmail === '' && editPhone === '' && editPass === '') {
            setShowAlert(true)
            setAlertTitle('ALERT')
            setAlertText('Enter a field to update')
            return
        } 

        try {
            const profileReq = await fetch('http://localhost:6001/api/fl/settings', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({editName, editEmail, editPhone, editPass}),
                credentials: 'include',
            })
            if (!profileReq.ok) {
                const error = await profileReq.json()
                console.log(error)
            } else {
                setEditName('')
                setEditEmail('')
                setEditPhone('')
                setEditPass('')
                const data = await profileReq.json()
                if (data.message === 'profile updated') {
                    setShowAlert(true)
                    setAlertTitle('SUCCESS')
                    setAlertText('Profile updated successfully, refresh page to see changes.')
                }
                if (data.error === 'User not found') {
                    setShowAlert(true)
                    setAlertTitle('ALERT')
                    setAlertText('Cannot make changes, no user profile found')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className='editCard-main-container' style={{display: display ? 'flex' : 'none'}} onSubmit={(e) => e.preventDefault()}>
            <button className='exit-button' type='button' onClick={closePopUp}>X</button>
            <h3 className='settingEdit-title'>{title}</h3>
            <input className='settingsEditCard-inputs' type='text' value={editName} onChange={nameChange} placeholder='Enter Your Name'></input>
            <input className='settingsEditCard-inputs' type='text' value={editEmail} onChange={emailChange} placeholder='Enter Your Email'></input>
            <input className='settingsEditCard-inputs' type='text' value={editPhone} onChange={phoneChange} placeholder='Enter Your Phone'></input>
            <input className='settingsEditCard-inputs' type='text' value={editPass} onChange={passChange} placeholder='Enter New Password'></input>
            <button className='settingEditCard-submit-btn' type='submit' onClick={updateProfile}>UPDATE INFO</button>
            <MoreInfo MoreInfoTitle={alertTitle} MoreInfoText={alertText} showMore={showAlert} setShowMore={setShowAlert} />
        </form>
    )
}

export default SettingsEditCard

// LET USERS UPLOAD AND ADD PICTURE FOR LOGO 