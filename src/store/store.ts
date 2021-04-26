import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import appModule, { AppState } from './modules/appModule';
import roomModule, { RoomState } from './modules/roomModule';

export interface State {
  app: AppState;
  room: RoomState;
}

const rootReducer = combineReducers({
  app: appModule.reducer,
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
