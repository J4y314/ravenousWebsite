import { createSlice } from "@reduxjs/toolkit"

const initialUserState = {
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    phoneNumber: "",
    avatar: ""
}
const initialState = {
    user: initialUserState,
    loaded: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login action
        // The login action will update the user state with the payload and set loaded to true, indicating that user data has been loaded or the user has successfully logged in.
        login: (state, action) => {
            state.user = action.payload;
            state.loaded = true;
        },

        // logout action
        // The logout action resets the user state to initialUserState and sets loaded to false, reflecting that the user has logged out and no user data should be considered loaded.
        logout: (state) => {
            state.loaded = false;
            state.user = initialUserState;
        },

        // loader action
        loader: (state, action) => {
            state.loaded = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, loader } = authSlice.actions

export default authSlice.reducer