// // src/redux/authSlice.ts
// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//     isLoggedIn: boolean;
//     token: string | null;
// }

// const initialState: AuthState = {
//     isLoggedIn: !!localStorage.getItem("token"),
//     token: localStorage.getItem("token"),
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state, action: PayloadAction<string>) => {
//             state.isLoggedIn = true;
//             state.token = action.payload;
//             localStorage.setItem("token", action.payload);
//         },
//         logout: (state) => {
//             state.isLoggedIn = false;
//             state.token = null;
//             localStorage.removeItem("token");
//         },
//     },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

// src/redux/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    uid: string;
    aid: string;
    // add other fields if needed
}

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    uid: string | null;
    aid: string | null;
}

const storedToken = localStorage.getItem("token");
let decoded: DecodedToken | null = null;

if (storedToken) {
    try {
        decoded = jwtDecode<DecodedToken>(storedToken);
    } catch (err) {
        console.error("Invalid token in storage:", err);
    }
}

const initialState: AuthState = {
    isLoggedIn: !!storedToken,
    token: storedToken,
    uid: decoded?.uid ?? null,
    aid: decoded?.aid ?? null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            let decoded: DecodedToken | null = null;

            try {
                decoded = jwtDecode<DecodedToken>(token);
            } catch (err) {
                console.error("Invalid token:", err);
            }

            state.isLoggedIn = true;
            state.token = token;
            state.uid = decoded?.uid ?? null;
            state.aid = decoded?.aid ?? null;

            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.uid = null;
            state.aid = null;

            localStorage.removeItem("token");

        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;