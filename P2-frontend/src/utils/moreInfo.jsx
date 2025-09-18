import '../styles/moreInfo.css'

function MoreInfo({showMore, setShowMore, MoreInfoTitle, MoreInfoText}) {
    const closeShowMore = () => {
        setShowMore(false)
    }
    return (
        <aside className='moreInfoCard-container' style={{display: showMore ? 'flex' : 'none'}}>
            <button type='button' className='exit-moreInfoCard-btn' onClick={closeShowMore}>X</button>
            <h3 className='moreInfoCard-title'>{MoreInfoTitle}</h3>
            <p className='moreInfoCard-text'>{MoreInfoText}</p>
        </aside>
    )
}

export default MoreInfo 