import '../styles/invoicesSubPages.css'
import TableCard from './tableCard'
import MoreInfo from '../utils/moreInfo'
import { showMoreHook, viewInvHooks } from '../hooks/fi-invoicesHooks'
import ViewInvoice from '../utils/viewInvs'
import ClPay from './clPayCard'
import {displayHooks} from '../hooks/cl-hooks'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../utils/stripe'

function InvSubPages({setDispNotif, view, setShowNew, setShowDraft, setDraft, setLoad, dispItem, setDispItem, showPage, subPageInfo, subPageInfoText, infoText, display, display2, display4, display5, setDisplay4, setInv, Inv, sendTo, title1, title2, title3, title4}) {
    const moreInfo = showMoreHook()
    const setShowMore = moreInfo.setShowMoreInfo
    const showMore = moreInfo.showMoreInfo

    const viewHook = viewInvHooks()
    const viewInv = viewHook.viewInv
    const setViewInv = viewHook.setViewInv
    const viewInvData = viewHook.viewInvData
    const setViewInvData = viewHook.setViewInvData

    const displayHook = displayHooks()
    const displayPay = displayHook.display 
    const setDisplayPay = displayHook.setDisplay
    const curInv = displayHook.curInv
    const setCurInv = displayHook.setCurInv
    
    const showSendInfo = () => {
        setShowMore(true)
    }

    return (
        <section className='inv-sub-page-container' style={{display: showPage ? 'flex' : 'none'}}>
            <MoreInfo showMore={showMore} setShowMore={setShowMore} MoreInfoTitle={subPageInfoText} MoreInfoText={infoText}/>
            <button className='inv-sub-page-text' type="button" onClick={showSendInfo}>{subPageInfo}</button>
            <TableCard setDispNotif={setDispNotif} view={view} setCurInv={setCurInv} clientDisp={setDisplayPay} setShowDraft={setShowDraft} setShowNew={setShowNew} setDraft={setDraft} setLoad={setLoad} setViewInvData={setViewInvData} setView={setViewInv} setDispItem={setDispItem} dispItem={dispItem} Inv={Inv} setInv={setInv} sendTo={sendTo} display={display} display2={display2} display4={display4} display5={display5} setDisplay4={setDisplay4} tableWidth={'95%'} tableID={"send-table-body"} invNumText={title1} clientText={title2} amountText={title3} statusText={title4} />
            <ViewInvoice viewInvData={viewInvData} displayInv={viewInv} setView={setViewInv} />
            <Elements stripe={stripePromise}>
                <ClPay curInv={curInv} setCurInv={setCurInv} setDisp={setDisplayPay} disp={displayPay} invDisp={display}/>
            </Elements>
        </section>
    )
}

export default InvSubPages