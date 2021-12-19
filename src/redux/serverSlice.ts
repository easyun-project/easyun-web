import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ServerModel} from "@/constant/server";
import serverService from "@/service/serverService";

export interface ServerState {
    loading: boolean,
    servers: ServerModel[]
}

const initialState: ServerState = {
    loading: true,
    servers: []
}

export const getServerList = createAsyncThunk(
    'server/getServerList',
    async (token: string) => {
        return await serverService.getServerList(token)
    }
);

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServerList.fulfilled, (state: ServerState, action) => {
            state.loading = false;
            state.servers = action.payload;
        });
        builder.addCase(getServerList.pending, (state: ServerState) => {
            state.loading = true;
        });
    }
});
export default serverSlice.reducer;
