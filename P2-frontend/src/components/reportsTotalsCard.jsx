import '../styles/reportsTotalsCard.css'

function TotalsCard({totalTitle}) {
    return (
        <article className='totalsCard-main-container'>
            <section className='totals-containers'>
                <h4 className='totals-titles'>{totalTitle}</h4>
                <p className='totals-info'>0</p>
            </section>
            <section className='totals-containers'>
                <h4 className='totals-titles'>Unpaid Total</h4>
                <p className='totals-info'>0</p>
            </section>
            <section className='totals-containers'>
                <h4 className='totals-titles'>Overdue Total</h4>
                <p className='totals-info'>0</p>
            </section>
        </article>
    )
}

export default TotalsCard