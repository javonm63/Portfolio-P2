import { showAlertHooks } from '../hooks/fl-apiHooks'
import { settingsCompanyEditHooks, settingsPayEditHooks } from '../hooks/fl-settingHooks'
import '../styles/settingsEditCard.css'
import MoreInfo from '../utils/moreInfo'

function SettingsEditCard2({title, title2, display, setDisplay, client}) {
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
    
    const companyHooks = settingsCompanyEditHooks()
    const street = companyHooks.street 
    const setStreet = companyHooks.setStreet
    const city = companyHooks.city 
    const setCity = companyHooks.setCity
    const state = companyHooks.state 
    const setState = companyHooks.setState
    const zip = companyHooks.zip 
    const setZip = companyHooks.setZip
    const payHooks = settingsPayEditHooks()
    const cardNumber = payHooks.cardNumber
    const setCardNumber = payHooks.setCardNumber
    const expiration = payHooks.expiration
    const setExpiration = payHooks.setExpiration
    const cvc = payHooks.cvc
    const setCvc = payHooks.setCvc


    async function updateCompany(e) {
        e.preventDefault()
        if (client) {
            if (street === '' && city === '' && state === '' && zip === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('All address fields are required, payment details are optional.')
                return
            }
            if (street === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid street')
            }
            if (city === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid city')
            }
            if (state === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid state')
            }
            if (zip === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid zip code')
            }
            try {
                const req = await fetch('http://localhost:6001/api/cl/settings', {
                    method: 'PATCH', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({street, city, state, zip, cardNumber, expiration, cvc, comp2: 'yes'}),
                    credentials: 'include',
                })
                if (!req.ok) {
                    const error = await req.json()
                    console.log(error)
                } else {
                    const data = await req.json()
                    if (data.message === 'company updated') {
                        setShowAlert(true)
                        setAlertTitle('SUCCESS')
                        setAlertText('Company address was updated successfully, refresh page to see changes.')
                        setStreet('')
                        setCity('')
                        setState('')
                        setZip('')
                        setCardNumber('')
                        setExpiration('')
                        setCvc('')
                    }
                } 
            } catch (err) {
                console.log(err)
            }
        } else {
            if (street === '' && city === '' && state === '' && zip === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('All address fields are required, payment details are optional.')
                return
            }
            if (street === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid street')
            }
            if (city === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid city')
            }
            if (state === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid state')
            }
            if (zip === '') {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText('Enter a valid zip code')
            }
            try {
                const req = await fetch('http://localhost:6001/api/fl/settings', {
                    method: 'PATCH', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({street, city, state, zip, cardNumber, expiration, cvc, comp2: 'yes'}),
                    credentials: 'include',
                })
                if (!req.ok) {
                    const error = await req.json()
                    console.log(error)
                } else {
                    const data = await req.json()
                    if (data.message === 'company updated') {
                        setShowAlert(true)
                        setAlertTitle('SUCCESS')
                        setAlertText('Company address was updated successfully, refresh page to see changes.')
                        setStreet('')
                        setCity('')
                        setState('')
                        setZip('')
                        setCardNumber('')
                        setExpiration('')
                        setCvc('')
                    }
                } 
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <form className='editCard-main-container' style={{display: display ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closePopUp}>X</button>
            <h3 className='settingEdit-title'>{title}</h3>
            <input className='settingsEditCard-inputs' type='text' value={street} onChange={(e) => setStreet(e.target.value)} placeholder='Enter Street Address' required></input>
            <input className='settingsEditCard-inputs' type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City' required></input>
            <input className='settingsEditCard-inputs' type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='Enter State' required></input>
            <input className='settingsEditCard-inputs' type='text' value={zip} onChange={(e) => setZip(e.target.value)} placeholder='Enter Zip' required></input>
            <h3 className='settingEdit-title'>{title2}</h3>
            <input className='settingsEditCard-inputs' type='text' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Enter Card Number'></input>
            <input className='settingsEditCard-inputs' type='text' value={expiration} onChange={(e) => setExpiration(e.target.value)} placeholder='Enter Expiration'></input>
            <input className='settingsEditCard-inputs' type='text' value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder='Enter Cvc'></input>
            <button className='settingEditCard-submit-btn' type='submit' onClick={updateCompany}>UPDATE INFO</button>

            <MoreInfo MoreInfoTitle={alertTitle} MoreInfoText={alertText} showMore={showAlert} setShowMore={setShowAlert} />
        </form>
    )
}

export default SettingsEditCard2

// LET USERS UPLOAD AND ADD PICTURE FOR LOGO 