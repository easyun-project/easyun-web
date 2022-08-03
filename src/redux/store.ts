import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, getStoredState, REHYDRATE } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from '@/redux/appSlice';
import userReducer from '@/redux/userSlice';
import dataCenterReducer from '@/redux/dataCenterSlice';
import subnetReducer from '@/redux/subnetSlice';
import routeReducer from '@/redux/routeSlice';
import secgroupReducer from '@/redux/secgroupSlice';
import intgatewayReducer from '@/redux/intgatewaySlice';
import natgatewayReducer from '@/redux/natgatewaySlice';
import staticipReducer from '@/redux/staticipSlice';
import serverReducer from '@/redux/serverSlice';
import bucketReducer from '@/redux/stbucketSlice';
import volumeReducer from '@/redux/stvolumeSlice';
import databaseReducer from '@/redux/databaseSlice';
import loadbalancerReducer from '@/redux/loadbalancerSlice';
// import { ResourceReducer } from 'i18next';
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
    user: userReducer,
    app: appReducer,
    dataCenter: dataCenterReducer,
    subnet: subnetReducer,
    route: routeReducer,
    secgroup: secgroupReducer,
    intgateway: intgatewayReducer,
    natgateway: natgatewayReducer,
    staticip: staticipReducer,
    server: serverReducer,
    stbucket: bucketReducer,
    stvolume: volumeReducer,
    database: databaseReducer,
    loadbalancer: loadbalancerReducer
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