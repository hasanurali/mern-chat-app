import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "@/features/index";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});