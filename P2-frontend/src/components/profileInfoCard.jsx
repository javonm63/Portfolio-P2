import '../styles/profileInfoCard.css'

function ProfileInfoCard({placeHolderText, addres, cardNum}) {
    return (
        <section className='companyInfo-main-container'>
            <span className='companyLogo-container'>
                <p className='companyLogo-placeholder'>{placeHolderText}</p>
            </span>
            <section className='companyInfo-Info-container'>
                <div className='companyInfo-top-container'>
                    <p className='addressTitle'>Address</p>
                    <p className='addressText'>{addres}</p>
                </div>
                <div className='companyInfo-bottom-container'>
                    <p className='paymentTitle'>Payment Details</p>
                    <p className='paymentText'>************{cardNum}</p>
                </div>
            </section>
        </section>
    )
}

export default ProfileInfoCard