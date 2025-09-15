import '../styles/invoicePageMenu.css'

function InvPgMenuCard({showSend, setShowSend}) {
    const unshowSend = () => {
        setShowSend(false)
    }
    return (
        <div className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button' onClick={unshowSend}>NEW</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>SEND</button>        
            <button className='invPage-menu-btns' type='button'>ALL</button>        
            <button className='invPage-menu-btns' type='button'>DRAFTS</button>        
        </div>
    )
}

export default InvPgMenuCard