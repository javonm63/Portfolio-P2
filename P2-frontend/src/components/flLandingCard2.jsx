import '../styles/flLandingCard2.css'

function LandingCard2({darkMode, card2Title, card2Text,card2Title2, card2Text2,card2Title3, card2Text3,card2Title4, card2Text4}) {
    return (
        <article className={darkMode ? 'landingCard2-main-cont dark' : 'landingCard2-main-cont'}>
            <section className='landingCard2-left-cont'>
                <img className='card2-icons' src='file-icon.png' alt='file icon'></img>
                <img id='client-icon' className='card2-icons' src='hands-icon.png' alt='client icon'></img>
                <img className='card2-icons' src='track-icons.webp' alt='track payments icon'></img>
                <img id="organized-icon" className='card2-icons' src='oranized-icon.webp' alt='staying organized icon'></img>
            </section>
            <div className='landingCard2-right-cont'>
                <span className='sidecont'>
                    <h3 className='card2-right-cont-titles'>{card2Title}</h3>
                    <p className='card2-right-cont-texts'><i>{card2Text}</i></p>
                </span>
                <span className='sidecont'>
                    <h3 className='card2-right-cont-titles'>{card2Title2}</h3>
                    <p className='card2-right-cont-texts'><i>{card2Text2}</i></p>
                </span>
                <span className='sidecont'>
                    <h3 className='card2-right-cont-titles'>{card2Title3}</h3>
                    <p className='card2-right-cont-texts'><i>{card2Text3}</i></p>
                </span>
                <span className='sidecont'>
                    <h3 className='card2-right-cont-titles'>{card2Title4}</h3>
                    <p className='card2-right-cont-texts'><i>{card2Text4}</i></p>
                </span>
            </div>
        </article>
    )
}

export default LandingCard2