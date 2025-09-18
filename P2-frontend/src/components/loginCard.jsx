import '../styles/loginCard.css'

function LoginCard({showSignup, closeSignup}) {
    return (
        <form className="loginCard-main-container" style={{display: showSignup ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closeSignup}>X</button>
            <h3 className='signup-titles'>LOGIN</h3>
            <input className='signup-inputs' type='text' placeholder='Email' required></input>
            <input className='signup-inputs' type='text' placeholder='Password' required></input>
            <button className='signup-button' type='submit'>Login</button>
        </form>
    )
}

export default LoginCard