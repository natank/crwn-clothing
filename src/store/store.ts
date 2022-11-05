// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import { rootReducer } from './root-reducer';
import { rootSaga } from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleWare
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

sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);
