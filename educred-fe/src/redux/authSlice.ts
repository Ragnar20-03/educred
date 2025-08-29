// src/redux/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
