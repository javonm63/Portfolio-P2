import '../styles/fl-signupCard.css'
import '../styles/fl-signupCard.css'
import { flSignupHooks } from '../hooks/fl-apiHooks'
import { showAlertHooks } from '../hooks/fl-apiHooks'
import MoreInfo from '../utils/moreInfo.jsx'

function ClSignUp({openSignup, closeSignup}) {
     const signupHooks = flSignupHooks()
    const name = signupHooks.name
    const setName = signupHooks.setName
    const company = signupHooks.company
    const setCompany = signupHooks.setCompany
    const email = signupHooks.email
    const setEmail = signupHooks.setEmail
    const phone = signupHooks.phone
    const setPhone = signupHooks.setPhone
    const pass = signupHooks.pass
    const setPass = signupHooks.setPass
    const conPass = signupHooks.confirmPass
    const setConPass = signupHooks.setConfirmPass

    const showAlertHook = showAlertHooks()
    const showAlert = showAlertHook.showAlert
    const setShowAlert = showAlertHook.setShowAlert
    const alertText = showAlertHook.alertText
    const setAlertText = showAlertHook.setAlertText

    async function signUp(e) {
        e.preventDefault()
        try {
            const req = await fetch('http://localhost:6001/api/cl/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: name, company: company, email: email, phone: phone, pass: pass, conPass: conPass, role: 'client'}),
                credentials: 'include'
            })
            if (!req.ok) {
                const data = await req.json()
                console.log(data)
                const error = data.errors
                const errorobj = error[0]
                if (errorobj.path === 'phone') {
                    setAlertText('Enter a valid phone number.')
                    setShowAlert(true)
                } else if (errorobj.path === 'email') {
                    setAlertText('Enter a valid email address.')
                    setShowAlert(true)
                } else if (errorobj.path === 'conPass') {
                    setAlertText('Passwords must match.')
                    setShowAlert(true)
                } 
            }
            const data = await req.json()
            console.log(data)
            if (data.message === 'client account created') {
                closeSignup()
                sessionStorage.setItem('role', JSON.stringify(data.role))
                window.location.href = '/cl/dashboard'
            } else if (data.message === 'User Already Exist') {
                setShowAlert(true)
                setAlertText('Email already registered try logging in.')
            }
        } catch (err) {
            console.log(err)
        }

        setName('')
        setCompany('')
        setEmail('')
        setPhone('')
        setPass('')
        setConPass('')
    }

    return (
        <form className='fl-signupCard-container' style={{display: openSignup ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closeSignup} >X</button>
            <h3 className='signup-titles'>Client account</h3>
            <input className='signup-inputs' type='text' placeholder='Enter Your Name'required value={name} onChange={(e) => setName(e.target.value)}></input>
            <input className='signup-inputs' type='email' placeholder='Enter Your Email'required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className='signup-inputs' type='tel' placeholder='Enter Your Phone'required value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            <input className='signup-inputs' type='text' placeholder='Create Passwaord'required value={pass} onChange={(e) => setPass(e.target.value)}></input>
            <input className='signup-inputs' type='text' placeholder='Confirm Password'required value={conPass} onChange={(e) => setConPass(e.target.value)}></input>
            <p className='signup-info'><i>By clicking the create account button you are agreeing to our terms and agreement; any information shared with us will never be used, sold or tampered and is solely for user identification.</i></p>
            <button className='signup-button' type='submit' onClick={signUp} >Create Account</button>
            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText}/>
        </form>
    ) 
}

export default ClSignUp