import {createSlice} from "@reduxjs/toolkit";

export interface AppState {
    loading: boolean,
    host: string
}

const initialState: AppState = {
    loading: false,
    host: ""
}

const hostType = 'app/updateHost';


export const hostAction = (host: string): { payload: string; type: string } => {
    return {
        type: hostType,
        payload: host,
    };
};

export const userSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateHost(state, action) {
            state.host = action.payload;
        }
    },
});
export default userSlice.reducer;
