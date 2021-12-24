import { createSlice } from '@reduxjs/toolkit';

export interface StorageState {
    storageList: []
}

const initialState: StorageState = {
    storageList: []
};

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {},
});
export default storageSlice.reducer;
