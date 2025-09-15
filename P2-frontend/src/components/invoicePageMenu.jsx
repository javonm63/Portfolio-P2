import '../styles/invoicePageMenu.css'

function InvPgMenuCard() {
    return (
        <div className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button'>NEW</button>        
            <button className='invPage-menu-btns' type='button'>SEND</button>        
            <button className='invPage-menu-btns' type='button'>ALL</button>        
            <button className='invPage-menu-btns' type='button'>DRAFTS</button>        
        </div>
    )
}

export default InvPgMenuCard