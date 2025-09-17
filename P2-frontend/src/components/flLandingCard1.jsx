import '../styles/flLandingCard1.css'

function LandingCard1({card1Title, card1Text, card1Btn, openSignup}) {
    return (
        <div className='landing-card1-main-cont'>
            <h2 className='landing-cards-titles'>{card1Title}</h2>
            <p className='landing-cards-texts'><i>{card1Text}</i></p>
            <button className='landing-cards-buttons' type='button' onClick={openSignup}>{card1Btn}</button>
        </div>
    )
}

export default LandingCard1 