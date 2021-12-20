import {configureStore} from '@reduxjs/toolkit';
import userStore from '@/redux/userSlice';
import appStore from '@/redux/appSlice';

const store = configureStore({
    reducer: {
        user: userStore,
        app: appStore,
    },
});


export type RootState = ReturnType<typeof store.getState>

export default store;
