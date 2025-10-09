import '../styles/newClientCard.css'
import { flAddClientHooks, showAlertHooks } from '../hooks/fl-clientsHooks'
import { useEffect } from 'react'
import MoreInfo from '../utils/moreInfo'

function NewClientInfo({setSendTo, send, setSend, setDisplay, disp}) {
    const addClientHook = flAddClientHooks()
    const name = addClientHook.name
    const setName = addClientHook.setName
    const email = addClientHook.email
    const setEmail = addClientHook.setEmail
    const phone = addClientHook.phone
    const setPhone = addClientHook.setPhone
    const city = addClientHook.city
    const setCity = addClientHook.setCity

    const showAlertHook = showAlertHooks()
    const showAlert = showAlertHook.showAlert
    const setShowAlert = showAlertHook.setShowAlert
    const alertText = showAlertHook.alertText
    const setAlertText = showAlertHook.setAlertText

    useEffect(() => {
        if (send) {
            if (!name || !email || !city || !phone) {
                setShowAlert(true)
                setAlertText('Enter all client information before adding client')
                setSend(false)
                return
            }
            async function addClient() {
                setSendTo((prev) => [...prev, {name, email, phone, city}])
                try {
                    const req = await fetch('http://localhost:6001/api/fl/clients', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({name, email, phone, city}),
                        credentials: 'include'
                    })
                    if (!req.ok) {
                        const dataObj = await req.json()
                        console.log(dataObj)
                        const dataArr = dataObj.errors
                        const data = dataArr[0]
                        console.log(data.path)
                        if (data.path === 'email') {
                            setShowAlert(true)
                            setAlertText('Enter a valid email address')
                        } else if (data.path === 'phone') {
                            setShowAlert(true)
                            setAlertText('Enter a valid phone number')
                        }
                        setSend(false)
                    } else {
                        const data = await req.json()
                        setSend(false)
                        setDisplay((prev) => [...prev, {name: data.name, email: data.email, phone: data.phone, city: data.city}])
                        setName('')
                        setEmail('')
                        setPhone('')
                        setCity('')
                    }
                } catch (err) {
                    console.log(err)
                    setSend(false)
                }
            }
        addClient()
        }
    }, [send])

    return (
        <form className='add-new-client-main-cont' style={{display: disp ? 'grid' : 'none'}}>
            <input className='add-new-client-inputs' type='text' placeholder="Enter client's name" required value={name} onChange={(ev) => setName(ev.target.value)}></input>
            <input className='add-new-client-inputs' type='email' placeholder="Enter client's email" required value={email} onChange={(ev) => setEmail(ev.target.value)}></input>
            <input className='add-new-client-inputs' type='number' placeholder="Enter client's phone" required value={phone} onChange={(ev) => setPhone(ev.target.value)}></input>
            <input className='add-new-client-inputs' type='text' placeholder="Enter client's city" required value={city} onChange={(ev) => setCity(ev.target.value)}></input>

            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText}/>
        </form>
    )
}

export default NewClientInfo