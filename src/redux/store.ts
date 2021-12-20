import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userStore from '@/redux/userSlice';
import appStore from '@/redux/appSlice';
import dataCenterStore from '@/redux/dataCenterSlice';
import serverStore from '@/redux/serverSlice';
import storageSession from 'redux-persist/lib/storage/session'
import {persistReducer, persistStore} from 'redux-persist';


let reducer = {
    user: userStore,
    app: appStore,
    dataCenter: dataCenterStore,
    server: serverStore
};

const storageConfig = {
    key: 'easyun', // 必须有的
    storage: storageSession, // 缓存机制
}

const persistedReducer = persistReducer(storageConfig, combineReducers(reducer))
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const persist = persistStore(store)
export type RootState = ReturnType<typeof store.getState>


export default store;
