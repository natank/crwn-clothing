// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const middleWares = [
  thunk,
  process.env.NODE_ENV !== 'production' && logger
].filter(Boolean);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools:
    process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  blacklist: ['user']
});

export const persistor = persistStore(store);
