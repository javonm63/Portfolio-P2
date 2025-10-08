import '../styles/settingsEditCard.css'

function SettingsEditCard({title, display, setDisplay}) {
    const closePopUp = () => {
        setDisplay(false)
    }
    return (
        <form className='editCard-main-container' style={{display: display ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closePopUp}>X</button>
            <h3 className='settingEdit-title'>{title}</h3>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Your Name'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Your Email'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Your Phone'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter New Password'></input>
            <button className='settingEditCard-submit-btn' type='submit'>UPDATE INFO</button>
        </form>
    )
}

export default SettingsEditCard

// LET USERS UPLOAD AND ADD PICTURE FOR LOGO 