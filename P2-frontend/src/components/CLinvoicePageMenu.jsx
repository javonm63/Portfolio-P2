import '../styles/invoicePageMenu.css'

function ClInvPgMenuCard({showSend, setShowSend, showAll, setShowAll, showNew }) {
    
    return (
        <div className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button' onClick={showSend}>NEW</button>        
            <button className='invPage-menu-btns' type='button' onClick={showNew}>SAVED</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>ALL</button>      
        </div>
    )
}

export default ClInvPgMenuCard