import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RoomState {
  roomId: string;
}

const roomInitialState: RoomState = {
  roomId: ''
};

// createSliceメソッドを使ってactionsとreducersを生成
const socketsModule = createSlice({
  name: 'room',
  initialState: roomInitialState,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomState>) => {
      Object.assign(state, action.payload);
    },
    unsetRoom: (state, action: PayloadAction) => {
      Object.assign(state, roomInitialState);
    }
  }
});

export default socketsModule;
