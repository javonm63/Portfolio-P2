import '../styles/qaCard.css'

function QaCard({qaCardTitle, qaBtnText, qaCardHref, qaLinkText}) {
    return (
        <div className='quick-action-card-cont'>
            <h3 className='quick-action-titles'>{qaCardTitle}</h3>
            <button className='quick-action-btns' type='button'>{qaBtnText}</button>
            <a className='quick-action-links' href={qaCardHref}>{qaLinkText}</a>
        </div>
    )
}

export default QaCard