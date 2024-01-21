import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletTransaction } from '../../components/wallet/UserWalletPage';
interface WalletState {
  walletBalance: number;
  walletHistory: WalletTransaction[];
}

const initialState: WalletState = {
  walletBalance: 0,
  walletHistory: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletBalance: (state, action: PayloadAction<{ walletBalance: number }>) => {
      const newState = {
        ...state,
        walletBalance: action.payload.walletBalance,
      };
      return newState;
    },
    setWalletHistory: (state, action: PayloadAction<{ walletHistory: WalletTransaction[] }>) => {
      const newState = {
        ...state,
        walletHistory: action.payload.walletHistory,
      };
      return newState;
    },
    
    
  },
});

export const { setWalletBalance, setWalletHistory } = walletSlice.actions;

export default walletSlice.reducer;
