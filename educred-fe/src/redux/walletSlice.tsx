import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WalletState {
  publicKey: string | null;
  walletName: string | null;
  connected: boolean;
}

const initialState: WalletState = {
  publicKey: null,
  walletName: null,
  connected: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (
      state,
      action: PayloadAction<{ publicKey: string; walletName: string }>
    ) => {
      state.publicKey = action.payload.publicKey;
      state.walletName = action.payload.walletName;
      state.connected = true;

      console.log("state saved : ", state.publicKey);
    },
    removeWallet: (state) => {
      state.publicKey = null;
      state.walletName = null;
      state.connected = false;
      console.log("wallet removed : ", state.publicKey);
    },
  },
});

export const { setWallet, removeWallet } = walletSlice.actions;
export default walletSlice.reducer;
