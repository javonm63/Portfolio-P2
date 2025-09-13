import './card.css'
function Card({cardTitle, cardText}) {
    return (
        <aside className="earning-cards-container">
            <p className="home-cards-titles">{cardTitle}</p>
            <p className="home-cards-text">{cardText}</p>
        </aside>
    )
}

export default Card