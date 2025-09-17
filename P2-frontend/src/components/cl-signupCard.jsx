import '../styles/fl-signupCard.css'

function ClSignUp({openSignup, closeSignup}) {
    return (
        <form className='fl-signupCard-container' style={{display: openSignup ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closeSignup} >X</button>
            <h3 className='signup-titles'>Client account</h3>
            <input className='signup-inputs' type='text' placeholder='Enter Your Name'required></input>
            <input className='signup-inputs' type='email' placeholder='Enter Your Email'required></input>
            <input className='signup-inputs' type='tel' placeholder='Enter Your Phone'required></input>
            <input className='signup-inputs' type='text' placeholder='Create Passwaord'required></input>
            <input className='signup-inputs' type='text' placeholder='Confirm Password'required></input>
            <p className='signup-info'><i>By clicking the create account button you are agreeing to our terms and agreement; any information shared with us will never be used, sold or tampered and is solely for user identification.</i></p>
            <button className='signup-button' type='submit'>Create Account</button>
        </form>
    ) 
}

export default ClSignUp