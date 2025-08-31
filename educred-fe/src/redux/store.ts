// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import walletReducer from "./walletSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        wallet: walletReducer
    },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;