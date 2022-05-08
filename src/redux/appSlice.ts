import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
    loading: boolean,
}

const initialState: AppState = {
    loading: true,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
});
export default appSlice.reducer;
