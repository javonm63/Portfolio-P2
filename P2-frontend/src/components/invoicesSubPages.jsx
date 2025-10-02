import '../styles/invoicesSubPages.css'
import TableCard from './tableCard'
import MoreInfo from '../utils/moreInfo'
import { showMoreHook, viewInvHooks } from '../hooks/fi-invoicesHooks'
import ViewInvoice from '../utils/viewInvs'

function InvSubPages({setShowNew, setShowDraft, setDraft, setLoad, dispItem, setDispItem, showPage, subPageInfo, subPageInfoText, infoText, display, display2, display4, setInv, Inv, sendTo}) {
    const moreInfo = showMoreHook()
    const setShowMore = moreInfo.setShowMoreInfo
    const showMore = moreInfo.showMoreInfo

    const viewHook = viewInvHooks()
    const viewInv = viewHook.viewInv
    const setViewInv = viewHook.setViewInv
    const viewInvData = viewHook.viewInvData
    const setViewInvData = viewHook.setViewInvData
    
    const showSendInfo = () => {
        setShowMore(true)
    }

    return (
        <section className='inv-sub-page-container' style={{display: showPage ? 'flex' : 'none'}}>
            <MoreInfo showMore={showMore} setShowMore={setShowMore} MoreInfoTitle={subPageInfoText} MoreInfoText={infoText}/>
            <button className='inv-sub-page-text' type="button" onClick={showSendInfo}>{subPageInfo}</button>
            <TableCard setShowDraft={setShowDraft} setShowNew={setShowNew} setDraft={setDraft} setLoad={setLoad} setViewInvData={setViewInvData} setView={setViewInv} setDispItem={setDispItem} dispItem={dispItem} Inv={Inv} setInv={setInv} sendTo={sendTo} display={display} display2={display2} display4={display4} tableWidth={'95%'} tableID={"send-table-body"} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STATUS'} />
            <ViewInvoice viewInvData={viewInvData} display={display} displayInv={viewInv} setView={setViewInv} />
        </section>
    )
}

export default InvSubPages