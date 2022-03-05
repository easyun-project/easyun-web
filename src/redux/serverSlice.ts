import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import serverService, { ServerDetailParams } from '@/service/serverService';


export interface ServerState {
    loading: boolean,
    servers: ServerModel[]
    currentServer: SeverDetailModel | undefined
}

const initialState: ServerState = {
    loading: true,
    servers: [],
    currentServer: undefined
};

export const getServerList = createAsyncThunk(
    'server/getServerList',
    async () => {
        return await serverService.getServerList();
    }
);


export const getServerDetail = createAsyncThunk(
    'server/getServerDetail',
    async (params: ServerDetailParams) => {
        return await serverService.getServerDetail(params);
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
        builder.addCase(getServerDetail.fulfilled, (state: ServerState, action) => {
            state.loading = false;
            state.currentServer = action.payload;
        });
        builder.addCase(getServerDetail.pending, (state: ServerState) => {
            state.loading = true;
        });
        builder.addCase(getServerDetail.rejected, (state: ServerState) => {
            state.loading = false;
        });
    }
});
export default serverSlice.reducer;
