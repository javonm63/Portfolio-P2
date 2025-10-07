import '../styles/invoicePageMenu.css'

function InvPgMenuCard({showSend, setShowSend, showAll, setShowAll, setShowNew, setBodyHeight, showDraft, setShowDraft, setShowDraftInvs}) {
    

    const unshowSend = () => {
        setShowSend(false)
        setShowAll(false)
        setShowNew(true)
        setBodyHeight(false)
        setShowDraft(false)
    }
    async function getDrafts() {
        try {
            const req = await fetch('http://localhost:6001/api/fl/draft', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                const database = data.data.Draft
                console.log(data, database)
                const draftsArr = Object.values(database)
                setShowDraftInvs(prev => {
                    const existingIds = new Set(prev.map(item => item.invId))
                    const newItems = draftsArr.filter(item => !existingIds.has(item.invId))
                    return [...prev, ...newItems]
                })
            }
        } catch (err) {
            console.log(err)
        }
        showDraft()
    }
    
    return (
        <nav className="invoice-page-menu-cont">
            <button className='invPage-menu-btns' type='button' onClick={unshowSend}>NEW</button>        
            <button className='invPage-menu-btns' type='button' onClick={showSend}>SEND</button>        
            <button className='invPage-menu-btns' type='button' onClick={showAll}>ALL</button>       
            <button className='invPage-menu-btns' type='button' onClick={getDrafts}>DRAFTS</button>       
        </nav>
    )
}

export default InvPgMenuCard