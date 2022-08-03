import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
    loading: boolean,
    hostUrl: string | undefined
}

const initialState: AppState = {
    loading: false,
    hostUrl: undefined
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateHostUrl(state, action) {
            state.hostUrl = action.payload;
        },
    }
});

export default appSlice.reducer;
