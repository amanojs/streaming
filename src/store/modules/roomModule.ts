import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
}

export interface RoomState {
  roomId: string;
  userName: string;
  isOwner: boolean;
  userList: User[];
}

const roomInitialState: RoomState = {
  roomId: '',
  userName: '',
  isOwner: false,
  userList: []
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
    },
    addUser: (state, action: PayloadAction<User>) => {
      const newUserList: User[] = [...state.userList, action.payload];
      Object.assign(state, { userList: newUserList });
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const newUserList: User[] = state.userList.filter((user) => user.id !== action.payload);
      Object.assign(state, { userList: newUserList });
    }
  }
});

export default socketsModule;
