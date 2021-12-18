import {createSlice} from "@reduxjs/toolkit";

export interface AppState {
    loading: boolean,
}

const initialState: AppState = {
    loading: false,
}

export const userSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
});
export default userSlice.reducer;
