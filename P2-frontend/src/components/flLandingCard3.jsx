import '../styles/flLandingCard3.css'
import BarGraphCard from './barGraphCard'
import ReportsGraphCard from './reportsGraphCard'

function LandingCard3({darkMode, openSignup, landingCard3Text, graphLabel}) {
    return (
        <div className={darkMode ? 'landingCard3-main-cont dark' : 'landingCard3-main-cont'}>
            <h3 className='landingCard-titles'>View your invoice stats</h3>
            <div className='landingGraph-container'>
                <ReportsGraphCard graphLabel={graphLabel}/>
            </div>
            <p className='landingCard3-texts'><i>{landingCard3Text}</i></p>
            <h3 className='landingCard-titles'>Get started for free</h3>
            <p className='landingCard3-texts'><i>Create an account to start centralizing your invoice management tasks today.</i></p>
            <button className='landing-cards-buttons' type='button' onClick={openSignup}>Sign Up</button>
        </div>
    )
}

export default LandingCard3