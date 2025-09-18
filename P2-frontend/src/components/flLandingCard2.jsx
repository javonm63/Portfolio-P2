import '../styles/flLandingCard2.css'

function LandingCard2({darkMode, card2Title, card2Text,card2Title2, card2Text2,card2Title3, card2Text3,card2Title4, card2Text4}) {
    return (
        <div className={darkMode ? 'landingCard2-main-cont dark' : 'landingCard2-main-cont'}>
            <div className='landingCard2-left-cont'>
                <img className='card2-icons' src='file-icon.png' alt='file icon'></img>
                <img id='client-icon' className='card2-icons' src='hands-icon.png' alt='client icon'></img>
                <img className='card2-icons' src='track-icons.webp' alt='track payments icon'></img>
                <img id="organized-icon" className='card2-icons' src='oranized-icon.webp' alt='staying organized icon'></img>
            </div>
            <div className='landingCard2-right-cont'>
                <div className='sidecont'>
                    <p className='card2-right-cont-titles'>{card2Title}</p>
                    <p className='card2-right-cont-texts'><i>{card2Text}</i></p>
                </div>
                <div className='sidecont'>
                    <p className='card2-right-cont-titles'>{card2Title2}</p>
                    <p className='card2-right-cont-texts'><i>{card2Text2}</i></p>
                </div>
                <div className='sidecont'>
                    <p className='card2-right-cont-titles'>{card2Title3}</p>
                    <p className='card2-right-cont-texts'><i>{card2Text3}</i></p>
                </div>
                <div className='sidecont'>
                    <p className='card2-right-cont-titles'>{card2Title4}</p>
                    <p className='card2-right-cont-texts'><i>{card2Text4}</i></p>
                </div>
            </div>
        </div>
    )
}

export default LandingCard2