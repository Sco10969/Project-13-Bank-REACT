import { createSlice } from '@reduxjs/toolkit'

const getStoredToken = () => {
    if (typeof window === 'undefined') {
        return ''
    }

    return localStorage.getItem('token') || sessionStorage.getItem('token') || ''
}

const initialToken = getStoredToken()

const initialState = {
    token: initialToken,
    isAuthenticated: Boolean(initialToken),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            state.isAuthenticated = Boolean(action.payload)
        },
        logout: (state) => {
            state.token = ''
            state.isAuthenticated = false
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
        },
    },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
