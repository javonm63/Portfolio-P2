import '../styles/card.css'
function Card({cardTitle, cardText, darkMode}) {
    return (
        <aside className={darkMode ? "earning-cards-container dark" : "earning-cards-container"}>
            <p className={darkMode ? "home-cards-titles dark" : "home-cards-titles"}>{cardTitle}</p>
            <p className={darkMode ? "home-cards-text dark" : "home-cards-text"}>{cardText}</p>
        </aside>
    )
}

export default Card