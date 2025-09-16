import '../styles/notifsCard.css'

function NotifsPage({showNotifs, setShowNotifs}) {
    const closeNotifPg = () => {
        setShowNotifs(false)
    }
    return (
        <div className='notif-page-main-cont' style={{display: showNotifs ? 'flex' : 'none'}}>
            <button className='exit-notif-page-button' type='button' onClick={closeNotifPg}>X</button>
            <h3 className='notif-page-title'>NOTIFICATIONS</h3>
        </div>
    )
}

export default NotifsPage