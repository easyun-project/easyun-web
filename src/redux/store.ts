import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userStore from '@/redux/userSlice';
import appStore from '@/redux/appSlice';
import dataCenterStore from '@/redux/dataCenterSlice';
import serverStore from '@/redux/serverSlice';
import storageStore from '@/redux/storageSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { getStoredState, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

export function crossBrowserListener(store, persistConfig) {
    return async function() {
        const state = await getStoredState(persistConfig);

        store.dispatch({
            type: REHYDRATE,
            key: persistConfig.key,
            payload: state,
        });
    };
}

const reducer = {
    user: userStore,
    app: appStore,
    dataCenter: dataCenterStore,
    server: serverStore,
    storage: storageStore
};

const storageConfig = {
    key: 'easyun', // 必须有的
    storage, // 缓存机制
    // stateReconciler: hardSet
};
const persistedReducer = persistReducer(storageConfig, combineReducers(reducer));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

window.addEventListener('storage', crossBrowserListener(store, storageConfig));

export default store;
