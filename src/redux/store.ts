import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appStore from '@/redux/appSlice';
import userStore from '@/redux/userSlice';
import dataCenterStore from '@/redux/dataCenterSlice';
import networkStore from '@/redux/networkSlice';
import resourceStore from '@/redux/resourceSlice';
import serverStore from '@/redux/serverSlice';
import storageStore from '@/redux/storageSlice';
import databaseStore from '@/redux/databaseSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { getStoredState, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { ResourceStore } from 'i18next';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import sessionStorage from 'redux-persist/es/storage/session';

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
    network: networkStore,
    resource: resourceStore,
    server: serverStore,
    storage: storageStore,
    database: databaseStore
};

const storageConfig = {
    key: 'easyun', // 必须有的
    storage, // 缓存机制
    // stateReconciler: hardSet
};
const persistedReducer = persistReducer(storageConfig, combineReducers(reducer));
const store = configureStore({
    reducer: persistedReducer,
    // devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

window.addEventListener('storage', crossBrowserListener(store, storageConfig));

export default store;
