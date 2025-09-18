import '../styles/invoicePageMenu.css'

function LandingPgMenuCard({showSend, showNewPg, showAll, showMerch, submenuText1, submenuText2, submenuText3, submenuText4}) {
    return (
        <section className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button' onClick={showNewPg}>{submenuText1}</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>{submenuText2}</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>{submenuText3}</button>      
            <button className='invPage-menu-btns' type='button' onClick={showMerch}>{submenuText4}</button>      
        </section>
    )
}

export default LandingPgMenuCard