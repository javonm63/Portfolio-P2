import { flAddClientHooks, showAlertHooks } from '../hooks/fl-clientsHooks'
import '../styles/editedInfoCard.css'
import MoreInfo from '../utils/moreInfo'

function EditedInfoCard({showEditPop, setShowEditPop, client, setDisplay}) {
    function closePopup() {
        setShowEditPop(false)
    }

    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const setAlertText = alertHooks.setAlertText
    const alertText = alertHooks.alertText

    const editClientHooks = flAddClientHooks()
    const name = editClientHooks.name
    const setName = editClientHooks.setName
    const email = editClientHooks.email
    const setEmail = editClientHooks.setEmail
    const phone = editClientHooks.phone
    const setPhone = editClientHooks.setPhone
    const city = editClientHooks.city
    const setCity = editClientHooks.setCity

    async function sendEditInfo() {
        const flClId = client
        try {
            const req = await fetch('http://localhost:6001/api/fl/clients', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({client: flClId, name, email, phone, city}),
                credentials: 'include'
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                if (data.message === 'client information updated') {
                    const dataArr = []
                    const dataObj = data.data[0]
                    const database = dataObj.database
                    for (const value of Object.values(database)) {
                        const {name, email, phone, city} = value 
                        dataArr.push({name, email, phone, city})
                    }
                    setDisplay(dataArr)
                    setShowAlert(true)
                    setAlertText('Client information updated successfully.')
                    setTimeout(() => {
                        setShowEditPop(false)
                        setShowAlert(false)
                        setAlertText('')
                    }, 3000)
                }
            }
        } catch (err) {
            console.log(err)
        }
        setName('')
        setEmail('')
        setPhone('')
        setCity('')
    }

    return (
        <form className='edit-popup-main-container' style={{display: showEditPop ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closePopup}>X</button>
            <h3 className='sub-title'>EDIT CLIENT INFO</h3>
            <input className='edit-info-inputs' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter client's name"></input>
            <input className='edit-info-inputs' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter client's email"></input>
            <input className='edit-info-inputs' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter client's phone"></input>
            <input className='edit-info-inputs' type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter client's city"></input>
            <button className='submit-edited-info-btn' type='button' onClick={sendEditInfo}>Done</button>

            <MoreInfo MoreInfoTitle={'ALERT'} MoreInfoText={alertText} showMore={showAlert} setShowMore={setShowAlert} />
        </form>
    )
}

export default EditedInfoCard