import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { setToken } from '../features/auth/authSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        setIsSubmitting(true)

        try {
            const loginResponse = await api.post('/user/login', {
                email,
                password,
            })
            const token = loginResponse?.data?.body?.token || ''

            if (!token) {
                throw new Error('Token de connexion manquant')
            }

            if (rememberMe) {
                localStorage.setItem('token', token)
                sessionStorage.removeItem('token')
            } else {
                sessionStorage.setItem('token', token)
                localStorage.removeItem('token')
            }

            dispatch(setToken(token))
            navigate('/profile')
        } catch (error) {
            const apiMessage = error?.response?.data?.message
            setErrorMessage(apiMessage || 'Identifiants invalides')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Header />

            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="email"
                                id="username"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        {errorMessage ? <p>{errorMessage}</p> : null}

                        <button type="submit" className="sign-in-button" disabled={isSubmitting}>
                            Sign In
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    )
}

