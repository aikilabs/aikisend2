import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    walletConnected: false,
    availableTokens: [],
    selectedToken: [],
};

export const aikiSend = createSlice({
    name: "errorMessage",
    initialState,
    reducers: {
        addUserAddress: (state, action) => {
            state.address = action.payload;
        },
        changeWalletConnectionState: (state, action) => {
            state.walletConnected = action.payload;
        },
        setAllAvailableTokens: (state, action) => {
            state.availableTokens = action.payload;
        },
        setSelectedToken: (state, action) => {
            state.selectedToken = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addUserAddress,
    changeWalletConnectionState,
    setAllAvailableTokens,
    setSelectedToken,
} = aikiSend.actions;

export default aikiSend.reducer;