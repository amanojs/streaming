import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RoomState {
  roomId: string;
  userName: string;
  isOwner: boolean;
}

const roomInitialState: RoomState = {
  roomId: '',
  userName: '',
  isOwner: false
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
