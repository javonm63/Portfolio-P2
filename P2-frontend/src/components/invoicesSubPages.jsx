import '../styles/invoicesSubPages.css'
import TableCard from './tableCard'
import MoreInfo from '../utils/moreInfo'
import { showMoreHook } from '../hooks/fi-invoicesHooks'

function InvSubPages({showSend, subPageInfo}) {
    const moreInfo = showMoreHook()
    const setShowMore = moreInfo.setShowMoreInfo
    const showMore = moreInfo.showMoreInfo
    const showSendInfo = () => {
        setShowMore(true)
    }

    return (
        <div className='inv-sub-page-container' style={{display: showSend ? 'flex' : 'none'}}>
            <MoreInfo showMore={showMore} setShowMore={setShowMore} MoreInfoTitle={"Sending invoice instructions."} MoreInfoText={"If an invoice is ready to send you can click the 'waiting' status on that invoice then follow the pop instructions."}/>
            <button className='inv-sub-page-text' type="button" onClick={showSendInfo}>{subPageInfo}</button>
            <TableCard tableWidth={'95%'} tableID={"send-table-body"} invNumText={'INVOICE'} clientText={'CLIENT'} amountText={'AMOUNT'} statusText={'STATUS'} />
        </div>
    )
}

export default InvSubPages