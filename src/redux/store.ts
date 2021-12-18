import {configureStore} from '@reduxjs/toolkit';
import userStore from '@/redux/userSlice';
import appStore from '@/redux/appSlice';
import dataCenterStore from '@/redux/dataCenterSlice';

const store = configureStore({
    reducer: {
        user: userStore,
        app: appStore,
        dataCenter: dataCenterStore
    },
});


export type RootState = ReturnType<typeof store.getState>

export default store;
