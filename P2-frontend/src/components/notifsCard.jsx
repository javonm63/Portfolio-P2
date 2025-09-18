import '../styles/notifsCard.css'

function NotifsPage({showNotifs, setShowNotifs}) {
    const closeNotifPg = () => {
        setShowNotifs(false)
    }
    return (
        <article className='notif-page-main-cont' style={{display: showNotifs ? 'flex' : 'none'}}>
            <button className='exit-notif-page-button' type='button' onClick={closeNotifPg}>X</button>
            <h3 className='notif-page-title'>NOTIFICATIONS</h3>
            <ul className='notifs-list'>
                <li className='notif-object'>
                    <p className='notif-text'>Invoice Sent</p>
                    <p className='notif-time'>-1 hr ago.</p>
                </li>
                <li className='notif-object'>
                    <p className='notif-text'>Invoice Paid</p>
                    <p className='notif-time'>-30 mins ago.</p>
                </li>
            </ul>
        </article>
    )
}

export default NotifsPage