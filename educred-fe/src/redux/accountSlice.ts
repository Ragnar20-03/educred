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
            state.institueEmail = action.payload.institueEmail;
            state.email = action.payload.email;
            state.fname = action.payload.fname;
            state.lname = action.payload.lname;
            state.ph = action.payload.ph;
            state.uid = action.payload.uid;
            state.wallet = action.payload.wallet;
            state.clubAccount = action.payload.clubAccount;
            state.eduCred = action.payload.eduCred;
            state.reputation = action.payload.reputation;

            console.log("set Account is : ", state.wallet, "name is : ", state.fname, " ", state.lname);

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