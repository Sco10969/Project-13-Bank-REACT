import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { logout } from '../features/auth/authSlice'
import { clearProfile, setProfile } from '../features/profile/profileSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProfilePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const firstName = useSelector((state) => state.profile.firstName)
    const lastName = useSelector((state) => state.profile.lastName)
    const [isEditing, setIsEditing] = useState(false)
    const [editFirstName, setEditFirstName] = useState('')
    const [editLastName, setEditLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
            return
        }

        const fetchProfile = async () => {
            try {
                const response = await api.post(
                    '/user/profile',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                dispatch(setProfile(response?.data?.body || {}))
            } catch {
                dispatch(logout())
                dispatch(clearProfile())
                navigate('/login', { replace: true })
            }
        }

        fetchProfile()
    }, [dispatch, navigate, token])

    const handleStartEdit = () => {
        setEditFirstName(firstName)
        setEditLastName(lastName)
        setIsEditing(true)
        setErrorMessage('')
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setEditFirstName(firstName)
        setEditLastName(lastName)
        setErrorMessage('')
    }

    const handleSaveProfile = async () => {
        if (!token) {
            navigate('/login', { replace: true })
            return
        }

        const sanitizedFirstName = editFirstName.trim()
        const sanitizedLastName = editLastName.trim()

        if (!sanitizedFirstName || !sanitizedLastName) {
            setErrorMessage('Les champs first name et last name sont obligatoires')
            return
        }

        try {
            const response = await api.put(
                '/user/profile',
                {
                    firstName: sanitizedFirstName,
                    lastName: sanitizedLastName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            dispatch(setProfile(response?.data?.body || {}))
            setIsEditing(false)
            setErrorMessage('')
        } catch (error) {
            const apiMessage = error?.response?.data?.message
            setErrorMessage(apiMessage || 'Mise a jour impossible')
        }
    }

    return (
        <>
            <Header />

            <main className="main bg-dark">
                <div className="header">
                    {isEditing ? (
                        <>
                            <h1>Welcome back</h1>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    value={editFirstName}
                                    onChange={(event) => setEditFirstName(event.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editLastName}
                                    onChange={(event) => setEditLastName(event.target.value)}
                                />
                            </div>
                            {errorMessage ? <p>{errorMessage}</p> : null}
                            <div className="input-wrapper">
                                <button
                                    className="edit-button"
                                    type="button"
                                    onClick={handleSaveProfile}
                                >
                                    Save
                                </button>
                                <button
                                    className="edit-button"
                                    type="button"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>
                                Welcome back
                                <br />
                                {firstName} {lastName}!
                            </h1>
                            <button className="edit-button" type="button" onClick={handleStartEdit}>
                                Edit Name
                            </button>
                        </>
                    )}
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
