import '../styles/notifsCard.css'
import MoreInfo from '../utils/moreInfo'

function NotifsPage({showNotifs, setShowNotifs, notifications, setShowAlert, setAlertText, setAlertTitle}) {
    const closeNotifPg = () => {
        setShowNotifs(false)
    }
    const clearNotifs = async () => {
        try {
            const req = await fetch('http://localhost:6001/api/fl/notifications', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({del: 'yes'}),
                credentials: 'include',
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                setShowAlert(true)
                setAlertTitle('CLEARED')
                setAlertText(String(data.message))
            }
        } catch(err) {
            console.log(err)
        }

    }
    return (
        <article className='notif-page-main-cont' style={{display: showNotifs ? 'flex' : 'none'}}>
            <button className='exit-notif-page-button' type='button' onClick={closeNotifPg}>X</button>
            <h3 className='notif-page-title'>NOTIFICATIONS</h3>
            <button className='clear-notifs-button' type='button' onClick={clearNotifs} >clear notifications</button>
            <ul className='notifs-list'>
                {notifications && notifications.map((item, i) => (
                    <li className='notif-object' key={i}>
                        <p className='notif-text'>{item.newNotif}</p>
                        <p className='notif-time'>{`-${item.whenNotif}`}</p>
                    </li>
                ))}
            </ul>
        </article>
    )
}

export default NotifsPage