import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.firstName = action.payload.firstName || ''
            state.lastName = action.payload.lastName || ''
            state.email = action.payload.email || ''
        },
        clearProfile: (state) => {
            state.firstName = ''
            state.lastName = ''
            state.email = ''
        },
    },
})

export const { setProfile, clearProfile } = profileSlice.actions
export default profileSlice.reducer
