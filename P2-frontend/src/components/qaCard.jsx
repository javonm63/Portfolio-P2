import '../styles/qaCard.css'

function QaCard({setDel, qaCardTitle, qaBtnText, qaCardHref, qaLinkText, setDisp}) {
    return (
        <nav className='quick-action-card-cont'>
            <h3 className='quick-action-titles'>{qaCardTitle}</h3>
            <button className='quick-action-btns' type='button' onClick={() => {
                setDisp(true) 
                setDel(true)}
                }>{qaBtnText}</button>
            <a className='quick-action-links' href={qaCardHref}>{qaLinkText}</a>
        </nav>
    )
}

export default QaCard