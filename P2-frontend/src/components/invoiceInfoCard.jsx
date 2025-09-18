import '../styles/invoiceInfoCard.css'
import {showMoreHook} from '../hooks/fi-invoicesHooks.jsx'
import MoreInfo from '../utils/moreInfo.jsx'

function InvoiceInfoCard() {
    const moreInfo = showMoreHook()
    const setShowMoreInfo = moreInfo.setShowMoreInfo
    const showMoreInfo = moreInfo.showMoreInfo
    const showInfo = () => {
        setShowMoreInfo(true)
    }
    return (
        <form className='invoice-page-container'>
            <div className='invoice-info-container'>
                <h3 className='page-section-titles'>Enter bill to information</h3>
                <section className='invoiceInfoCard-input-cont'>
                    <div className='bill-to-info-text-conts'>
                        <p className='bill-to-info-text'>Enter Client's Name:</p>
                        <p className='bill-to-info-text'>Enter Invoice ID:<button type='button' className='MoreInfo-button' onClick={showInfo}>i</button></p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', width: '100%' }}>
                        <input className='invoiceInfoCard-inputs' type="text" placeholder="Name" required></input>
                        <input className='invoiceInfoCard-inputs' type="number" placeholder="Invoice ID" required></input>
                    </div>
                    <div className='bill-to-info-text-conts'>
                        <p className='bill-to-info-text'>Enter Today's Date:</p>
                        <p className='bill-to-info-text'>Enter Due Date:</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', width: '100%' }}>
                        <input className='invoiceInfoCard-inputs' type="date" placeholder="Today's Date" required></input>
                        <input className='invoiceInfoCard-inputs' type="date" placeholder="Due Date" required></input>
                    </div>
                </section>
            </div>
            <MoreInfo showMore={showMoreInfo} setShowMore={setShowMoreInfo} MoreInfoTitle={"Invoice Number Info."} MoreInfoText={"Invoice number is a unique ID given to each invoice created; if the invoice number text field is left empty an invoice ID will be automatically generated once you've pressed the 'Create Invoice' or the 'Save Invoice' button."} />
        </form>
    )
}

export default InvoiceInfoCard