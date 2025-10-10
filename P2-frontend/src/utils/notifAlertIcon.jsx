import '../styles/notifAlertIcon.css'

function NotifIcon({dispNalert}) {
    return (
        <div className='notif-alert-icon' style={{display: dispNalert ? 'flex' : 'none'}}></div>
    )
}

export default NotifIcon