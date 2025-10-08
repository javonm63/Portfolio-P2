import '../styles/settingsEditCard.css'

function SettingsEditCard2({title, title2, display, setDisplay}) {
    const closePopUp = () => {
        setDisplay(false)
    }
    return (
        <form className='editCard-main-container' style={{display: display ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closePopUp}>X</button>
            <h3 className='settingEdit-title'>{title}</h3>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Street Address'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter City'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter State'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Zip'></input>
            <h3 className='settingEdit-title'>{title2}</h3>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Card Number'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Expiration'></input>
            <input className='settingsEditCard-inputs' type='text' placeholder='Enter Cvc'></input>
            <button className='settingEditCard-submit-btn' type='submit'>UPDATE INFO</button>
        </form>
    )
}

export default SettingsEditCard2

// LET USERS UPLOAD AND ADD PICTURE FOR LOGO 