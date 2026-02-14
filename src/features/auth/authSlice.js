import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
    isAuthenticated: false,
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
        },
    },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
