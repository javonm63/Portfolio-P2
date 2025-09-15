import '../styles/invoicePageMenu.css'

function InvPgMenuCard({showSend, setShowSend, showAll, setShowAll, setShowNew, setBodyHeight, showDraft, setShowDraft}) {
    const unshowSend = () => {
        setShowSend(false)
        setShowAll(false)
        setShowNew(true)
        setBodyHeight(false)
        setShowDraft(false)
    }
    
    return (
        <div className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button' onClick={unshowSend}>NEW</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>SEND</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>ALL</button>        
            <button className='invPage-menu-btns' type='button' onClick={showDraft}>DRAFTS</button>        
        </div>
    )
}

export default InvPgMenuCard