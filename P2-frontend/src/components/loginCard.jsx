import '../styles/loginCard.css'
import { flSignupHooks } from '../hooks/fl-apiHooks'
import { showAlertHooks } from '../hooks/fl-apiHooks'
import MoreInfo from '../utils/moreInfo.jsx'

function LoginCard({showSignup, closeSignup}) {
    const flLoginHooks = flSignupHooks()
    const email = flLoginHooks.email
    const setEmail = flLoginHooks.setEmail
    const pass = flLoginHooks.pass
    const setPass = flLoginHooks.setPass

    const showAlertHook = showAlertHooks()
    const showAlert = showAlertHook.showAlert
    const setShowAlert = showAlertHook.setShowAlert
    const alertText = showAlertHook.alertText
    const setAlertText = showAlertHook.setAlertText

    async function login() {
        const res = await fetch('https://localhost:6001/api/fl/login', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, pass: pass}),
            credentials: 'include'
        })
        if (!res.ok) {
            const data = await res.json()
            const dataArr = data.errors 
            console.log(dataArr)
            const dataObj = dataArr[0]
            const path = dataObj.path
            if (path === 'email') {
                setShowAlert(true)
                setAlertText('Enter a valid email address')
            }
        }
        
        const data = await res.json()
        console.log(data)
        if (data.message === 'Invalid credentials') {
            setShowAlert(true)
            setAlertText('Invalid credentials try again')
        } else if (data.message === 'No account') {
            setShowAlert(true)
            setAlertText('Email not registered to any accounts')
        } else if (data.message === 'Logged in successfully') {
            window.location.href = '/fl/dashboard'
        }
    }

  
        
     
    return (
        
        <form className="loginCard-main-container" style={{display: showSignup ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closeSignup}>X</button>
            <h3 className='signup-titles'>LOGIN</h3>
            <input className='signup-inputs' type='text' placeholder='Email' required value={email} onChange={(ev) =>{setEmail(ev.target.value)}}></input>
            <input className='signup-inputs' type='text' placeholder='Password' required value={pass} onChange={(ev) =>{setPass(ev.target.value)}}></input>
            <button className='signup-button' type='button' onClick={login}>Login</button>

            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText} />
        </form>
    )
}

export default LoginCard