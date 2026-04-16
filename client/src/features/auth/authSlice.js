import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userData: {},
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        initializeUser: (state, action) => {
            state.userData = action.payload;
        },

        clearUser: (state, action) => {
            state.userData = {}
        }

    }
})


export const { initializeUser, clearUser } = authSlice.actions;
export default authSlice.reducer;