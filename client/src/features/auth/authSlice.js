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

    }
})


export const { initializeUser } = authSlice.actions;
export default authSlice.reducer;