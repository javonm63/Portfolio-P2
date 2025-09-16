import '../styles/invoicePageMenu.css'

function ClInvPgMenuCard({showSend, showNewPg, showAll}) {
    
    return (
        <div className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button' onClick={showNewPg}>NEW</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>SAVED</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>ALL</button>      
        </div>
    )
}

export default ClInvPgMenuCard