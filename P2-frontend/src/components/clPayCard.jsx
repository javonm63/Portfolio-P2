import { showAlertHooks } from '../hooks/fl-apiHooks'
import '../styles/clPayCard.css'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import MoreInfo from '../utils/moreInfo'
import { displayHooks } from '../hooks/cl-hooks'

function ClPay({disp, setDisp, invDisp, curInv, setCurInv}) {
    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const alertText = alertHooks.alertText
    const setAlertText = alertHooks.setAlertText
    const alertTitle = alertHooks.alertTitle
    const setAlertTitle = alertHooks.setAlertTitle

    const totalHook = displayHooks()
    const invTotal = totalHook.invTotal
    const setInvTotal = totalHook.setInvTotal
    const cardName = totalHook.cardName
    const setCardName = totalHook.setCardName
    const invNum = totalHook.invNum
    const setinvNum = totalHook.setinvNum

    const stripe = useStripe()
    const elements = useElements()

    const closePopup = () => {
        setDisp(false)
    }
    const submitPayInt = async () => {
        const invToPayNum = curInv[0]
        const invToPay = invDisp.find(inv => inv.invId === invToPayNum)
        const total = invToPay.total + '00'
        const req = await fetch('http://localhost:6001/api/cl/pay', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: total, currency: 'usd', comp: 'no'}),
            credentials: 'include'
        })

        const data = await req.json()
        const userName = data.username
        const clientSecret = data.clientSecret
        const cardNumberElement = elements.getElement(CardNumberElement)
        const cardExpiryElement = elements.getElement(CardExpiryElement)
        const cardCvcElement = elements.getElement(CardCvcElement)
        const cardNameElement = cardName 

        if (cardName !== userName) {
            setShowAlert(true)
            setAlertTitle('ALERT')
            setAlertText('Invalid card credentials')
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: cardNumberElement,
            }
        })

        if (error) {
            console.error(error.message);
            if (error.message) {
                setShowAlert(true)
                setAlertTitle('ALERT')
                setAlertText(error.message)
            }
        } else if (paymentIntent.status === "succeeded") {
            setShowAlert(true)
            setAlertTitle('SUCCESS!')
            setAlertText('payment was successful, refresh page to see changes.')
            setTimeout(() => {
                setAlertText('')
                setAlertTitle('')
                setShowAlert(false)
            }, 3000)
            if (cardNumberElement) cardNumberElement.clear()
            if (cardExpiryElement) cardExpiryElement.clear()
            if (cardCvcElement) cardCvcElement.clear()
            setInvTotal(false)
            setCardName('')
            setinvNum('Choose Invoice:')
        }

        const sucess = await fetch('http://localhost:6001/api/cl/pay', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({invId: invToPayNum, comp: 'yes'}),
            credentials: 'include'
        })

        setCurInv([])
    }

    const displayTotal = () => {
        setInvTotal(true)
    }
    const showPayInfo = () => {
        setShowAlert(true)
        setAlertTitle('Pay Invoice Info.s')
        setAlertText("To pay for an invoice first select the invoice you want to pay for by its invoice number from the dropdown 'Choose Invoice' the click the select button, the invoice total is then displayed below the select button. Enter your payment information then select if you want to save the invoice or not, after entering your payment details you can click the pay button; make sure you agree to our terms and conditions for virtual payments.")
    }

    return (
        <div className='payCard-main-container' style={{display: disp ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closePopup}>X</button>
            <h3 className='sub-title'>PAY INVOICE</h3>
            <button className='pay-invoice-info-btn' type='button' onClick={showPayInfo}>SEE PAY INVOICE INFORMATION</button>
            <select className='payCard-dropdown' value={invNum} onChange={(e) => setinvNum(e.target.value)}>
                <option className='payCard-dropdown-options' value="no invoice chosen" >Choose Invoice:</option>
                {invDisp && invDisp.map((item, i) => (
                    <option key={i} className='payCard-dropdown-options' value={item.invId}>{`#${item.invId}`}</option>
                ))}
            </select>
            <button className='payCard-dropdown-button' type='button' onClick={displayTotal}>select invoice</button>
            <input className='total-display' type='text' value={invTotal ? `invoice total: $${curInv[1]}` : 'invoice total: '}readOnly></input>
            <fieldset className='payment-info-container'>
                <legend className='label-for-payment-info'>Payment Info</legend>
                <label htmlFor='payment-info-name'>Cardholder's Name</label>
                <input id='payment-info-name' className='payment-info-inputs' type='text' value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder='Enter name on card' required></input>
                <label htmlFor='payment-info-num'>Card Number</label>
                <CardNumberElement />
                <label htmlFor='payment-info-date'>Expiration Date</label>
                <CardExpiryElement />
                <label htmlFor='payment-info-pass'>CVC</label>
                <CardCvcElement />
            </fieldset>
            <p className='save-invoice-info'>Save this invoice to your account?</p>
            <input className='save-inv-checkbox' type='checkbox' defaultChecked></input>
            <p className='pay-button-conditions'>By clicking the pay button you are authorizing FreelancerInnvoice.com to process the payment using the information provided; you confirm that the payment details entered are correct, and that you are the authorized cardholder or have permission to use this payment method.</p>
            <button className='submit-payment-button' type='button' onClick={submitPayInt}>PAY</button>

            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={alertTitle} MoreInfoText={alertText} />
        </div>
    )
}

export default ClPay