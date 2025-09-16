import '../styles/reportsTotalsCard.css'

function TotalsCard({totalTitle}) {
    return (
        <div className='totalsCard-main-container'>
            <div className='totals-containers'>
                <h4 className='totals-titles'>{totalTitle}</h4>
                <p className='totals-info'>0</p>
            </div>
            <div className='totals-containers'>
                <h4 className='totals-titles'>Unpaid Total</h4>
                <p className='totals-info'>0</p>
            </div>
            <div className='totals-containers'>
                <h4 className='totals-titles'>Overdue Total</h4>
                <p className='totals-info'>0</p>
            </div>
        </div>
    )
}

export default TotalsCard