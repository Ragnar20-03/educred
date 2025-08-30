// src/redux/accountSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Wallet {
    walletAddress: string;
    walletName: string;
}

interface AccountState {
    institueEmail: string | null;
    email: string | null;
    fname: string | null;
    lname: string | null;
    ph: string | null;
    uid: string | null;
    wallet: Wallet | null;
    clubAccount: boolean;
    eduCred: number;
    reputation: number;
}

const initialState: AccountState = {
    institueEmail: null,
    email: null,
    fname: null,
    lname: null,
    ph: null,
    uid: null,
    wallet: null,
    clubAccount: false,
    eduCred: 13242,
    reputation: 0,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<AccountState>) => {
            return { ...state, ...action.payload };
        },
        updateReputation: (state, action: PayloadAction<number>) => {
            state.reputation += action.payload;
        },
        updateEcred: (state, action: PayloadAction<number>) => {
            state.eduCred += action.payload;
        },
        resetAccount: () => initialState,
    },
});

export const { setAccount, updateReputation, updateEcred, resetAccount } = accountSlice.actions;
export default accountSlice.reducer;