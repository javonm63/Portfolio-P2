import '../styles/profileInfoCard.css'

function ProfileInfoCard({placeHolderText}) {
    return (
        <section className='companyInfo-main-container'>
            <span className='companyLogo-container'>
                <p className='companyLogo-placeholder'>{placeHolderText}</p>
            </span>
            <section className='companyInfo-Info-container'>
                <div className='companyInfo-top-container'>
                    <p className='addressTitle'>Address</p>
                    <p className='addressText'>123 helloworld st. earth, MW, 00345</p>
                </div>
                <div className='companyInfo-bottom-container'>
                    <p className='paymentTitle'>Payment Details</p>
                    <p className='paymentText'>************1234</p>
                </div>
            </section>
        </section>
    )
}

export default ProfileInfoCard