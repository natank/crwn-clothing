import {
  compose,
  configureStore,
  Middleware
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import {
  PersistConfig,
  persistReducer,
  persistStore
} from 'redux-persist';
import { rootReducer } from './root-reducer';
import { rootSaga } from './rootSaga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  blacklist: ['user']
};

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleWare
].filter((middleware): middleware is Middleware =>
  Boolean(middleware)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: ((process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose) as unknown as boolean
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);
