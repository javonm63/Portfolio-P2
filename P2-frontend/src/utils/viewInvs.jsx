import TableCard from '../components/tableCard'
import '../styles/viewinvs.css'

function ViewInvoice({viewInvData, displayInv, setView}) {
    let inv;
    let items;
    if (viewInvData.length === 0) {
        return
    } else {
        inv = viewInvData[0]
        items = inv.item
    }
    
    
    function closeViewInvoice() {
        setView(false)
    }
    const text = 'HELLO'
    return (
        <article className='view-invoice-main-container' style={{display: displayInv ? 'flex' : 'none'}}>
            <button className='exit-button' type='button' onClick={closeViewInvoice}>X</button>
            <h3 className='page-sub-title'>INVOICE</h3>
            <p className='viewInv-page-info'>On this page you can see an invoice's details however these are readonly files and cannot be edited.</p>
            <p className='labels-for-viewInvs'>Client's name:</p>
            <p id='name' className='view-invoice-client-info' type='text' readOnly>{inv.name}</p> 
            <p className='labels-for-viewInvs'>Invoice ID:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{`#${inv.invId}`}</p> 
            <p className='labels-for-viewInvs'>Created:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{inv.date}</p> 
            <p className='labels-for-viewInvs'>Due Date:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{inv.due}</p> 
            <p className='viewInv-item-table-title'>ITEMS:</p>
            <TableCard display3={items} tableWidth={'95%'} tableID={"send-table-body"} invNumText={'ITEM'} clientText={'DESCRIPTION'} amountText={'QUANTITY'} statusText={'PRICE'}/>
            <p className='labels-for-viewInvs'>Notes:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{inv.notes}</p> 
            <p className='labels-for-viewInvs'>Fees:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{`$${inv.fees}`}</p> 
            <p className='labels-for-viewInvs'>Discounts:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{`$${inv.discounts}`}</p> 
            <p className='labels-for-viewInvs'>Coupons:</p>
            <p className='view-invoice-client-info' type='text' readOnly>{inv.coupons}</p> 
        </article>
    )
}

export default ViewInvoice