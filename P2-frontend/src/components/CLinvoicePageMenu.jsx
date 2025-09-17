import '../styles/invoicePageMenu.css'

function ClInvPgMenuCard({display, showSend, showNewPg, showAll, submenuText1, submenuText2, submenuText3}) {
    
    return (
        <div className="invoice-page-menu-cont" style={{display: display ? 'flex' : 'none'}}>
            <button className='invPage-menu-btns' type='button' onClick={showNewPg}>{submenuText1}</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>{submenuText2}</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>{submenuText3}</button>      
        </div>
    )
}

export default ClInvPgMenuCard