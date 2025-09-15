import '../styles/newClientCard.css'

function NewClientInfo() {
    return (
        <form className='add-new-client-main-cont'>
            <input className='add-new-client-inputs' type='text' placeholder="Enter client's name" required></input>
            <input className='add-new-client-inputs' type='email' placeholder="Enter client's email" required></input>
            <input className='add-new-client-inputs' type='number' placeholder="Enter client's phone" required></input>
            <input className='add-new-client-inputs' type='text' placeholder="Enter client's city" required></input>
        </form>
    )
}

export default NewClientInfo