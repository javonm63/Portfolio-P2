import '../styles/loginCard.css'
import { useEffect } from 'react'

function LoginCard({showSignup, closeSignup}) {

    async function login() {
        const user = {nameF: 'Javon', nameL: 'Martin'}
        const res = await fetch('https://localhost:6001/api/fl/invoices', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data)
    }

  
        
    
    return (
        
        <form className="loginCard-main-container" style={{display: showSignup ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closeSignup}>X</button>
            <h3 className='signup-titles'>LOGIN</h3>
            <input className='signup-inputs' type='text' placeholder='Email' required></input>
            <input className='signup-inputs' type='text' placeholder='Password' required></input>
            <button className='signup-button' type='button' onClick={login}>Login</button>
        </form>
    )
}

export default LoginCard