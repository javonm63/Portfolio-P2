import '../styles/sendPopup.css'
import { showDarkModeHook } from '../hooks/landingPageHooks'
import { useEffect } from 'react'
import { sendInvHook, sendToHooks } from '../hooks/fi-invoicesHooks'
import { showAlertHooks } from '../hooks/fl-apiHooks'
import MoreInfo from '../utils/moreInfo'

function SendPopup({dispItem, setDispItem, display, setDisplay, sendTo, inv}) {
    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    const showAlertHook = showAlertHooks()
    const showAlert = showAlertHook.showAlert
    const setShowAlert = showAlertHook.setShowAlert
    const alertText = showAlertHook.alertText
    const setAlertText = showAlertHook.setAlertText

    const sendCLHook = sendInvHook()
    const sendCL = sendCLHook.sendCL
    const setSendCL = sendCLHook.setSendCL

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme : dark)').matches) {
            setDarkMode(true)
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
        })
    })

    const closePopup = () => {
        setDisplay(false)
    }

    const showMoreInfo = () => {
        setShowAlert(true)
        setAlertText('If a client have an FLI.com client account then you have the option to send them e-invoices to their account using the send button. The email button is for sending invoices to clients via email.')
    }

    const sendInvoice = async () => {
        try {
            const req = await fetch('http://localhost:6001/api/fl/invoices', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({invId: inv, sendCL}),
                credentials: 'include',
            })

            if (!req.ok) {
                const data = await req.json()
                console.log(data)
                if (data.error === "client doesn't have a fli account") {
                    setShowAlert(true)
                    setAlertText("This client doesn't have a FreelancerInnvoice.com account, try emailing the invoice.")
                }
            } else {
                const data = await req.json()
                if (data) {
                    const updateIndex = dispItem.findIndex((inv) => inv.invId === data.invId)
                    const updateInv = dispItem.splice(updateIndex, 1)
                    setDispItem((prev) => [...prev, data])
                    setShowAlert(true)
                    setAlertText('Invoice Sent')
                    setTimeout(() => {
                        setShowAlert(false)
                        setDisplay(false)
                    }, 3000)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const emailInvoice = async () => {
        try {
            const req = await fetch(`http://localhost:6001/api/fl/email${inv}/pdf`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({invId: inv, sendCL}),
                credentials: 'include',
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                const { url, name, company } = data
                const recipient = sendCL
                const subject = encodeURIComponent('Incoming invoice from FLI.com')
                const body = encodeURIComponent(`Hello ${name}, here is invoice ${inv} from ${company}:\n${url}`)

                setDisplay(false)
                window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
            }
        } catch(err) {
            console.log(err)
        }
        
    }

    return (
        <article className="send-popup-main-container" style={{display: display ? 'flex' : 'none'}}>
            <button className='exit-button' type="button" onClick={closePopup}>X</button>
            <h4 className={darkMode ? 'send-to-title dark' : 'send-to-title'}>SEND TO</h4>
            <p className='sendTo-info'>To send an invoice to an client first select a client from the dropdown then click how you want to send the invoice.<button className='MoreInfo-button' type='button' onClick={showMoreInfo}>i</button></p>
            <select className='sendTo-dropdown' value={sendCL} onChange={(e) => setSendCL(e.target.value)}>
                <option className='sendTo-options' value={'nothing entered'}defaultValue>CHOOSE A CLIENT</option>
                {sendTo && sendTo.map((item, i) => (
                    <option key={i} className='sendTo-options' value={item.email}>{item.name}</option>
                ))}
            </select>
            <button className='send-invoice-buttons' type='button' onClick={emailInvoice}>Email Invoice</button>
            <button className='send-invoice-buttons' type='button' onClick={sendInvoice}>Send Invoice</button>

            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'Sending Invoices Info'} MoreInfoText={alertText} />
        </article>
    )
}

export default SendPopup
