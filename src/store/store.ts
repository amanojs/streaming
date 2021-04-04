import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import roomModule, { RoomState } from './modules/roomModule';

export interface State {
  room: RoomState;
}

const rootReducer = combineReducers({
  room: roomModule.reducer
});

export const setUpStore = () => {
  const middlewares = [...getDefaultMiddleware(), logger];
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares
  });
  return store;
};
