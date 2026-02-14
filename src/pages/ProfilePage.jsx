import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProfilePage() {
    return (
        <>
            <Header />

            <main className="main bg-dark">
                <div className="header">
                    <h1>
                        Welcome back
                        <br />
                        Tony Jarvis!
                    </h1>
                    <button className="edit-button" type="button">
                        Edit Name
                    </button>
                </div>

                <h2 className="sr-only">Accounts</h2>

                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button" type="button">
                            View transactions
                        </button>
                    </div>
                </section>

                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button" type="button">
                            View transactions
                        </button>
                    </div>
                </section>

                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button" type="button">
                            View transactions
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
