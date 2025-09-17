import '../styles/flLandingCard3.css'
import BarGraphCard from './barGraphCard'

function LandingCard3() {
    return (
        <div className='landingCard3-main-cont'>
            <h3 className='landingCard-titles'>View your invoice stats</h3>
            <div className='landingGraph-container'>
                <BarGraphCard />
            </div>
            <p className='landingCard3-texts'><i>You can also view insights about your invoices and clients such as paid vs unpaid invoices, monthly earnings, outstanding balances etc.</i></p>
            <h3 className='landingCard-titles'>Get started for free</h3>
            <p className='landingCard3-texts'><i>Create an account to start centralizing your invoice management tasks today.</i></p>
            <button className='landing-cards-buttons' type='button'>Sign Up</button>
        </div>
    )
}

export default LandingCard3