import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  header: boolean;
}

const appInitialState: AppState = {
  header: false
};

// createSliceメソッドを使ってactionsとreducersを生成
const appModule = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setHeader: (state, action: PayloadAction<boolean>) => {
      Object.assign(state, { header: action.payload });
    }
  }
});

export default appModule;
