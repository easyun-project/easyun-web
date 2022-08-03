import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import serverService, { DcNameQueryParm, ServerDetailParams } from '@/service/serverService';


export interface ServerState {
    loading: boolean,
    servers: ServerModel[],
    currentServer: SeverDetailModel | undefined
}

const initialState: ServerState = {
    loading: false,
    servers: [],
    currentServer: undefined
};

export const listAllServer = createAsyncThunk(
    'server/listAllServer',
    async (params: DcNameQueryParm) => {
        return await serverService.listAllServer(params);
    }
);

export const getServerList = createAsyncThunk(
    'server/getServerList',
    async (params: DcNameQueryParm) => {
        return await serverService.getServerList(params);
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
    reducers: {
        updateServerTags(state, action) {
            if(state.currentServer){
                state.currentServer.svrTags = action.payload;
            }

        },
    },
    extraReducers: (builder) => {
        builder.addCase(listAllServer.fulfilled, (state: ServerState, action) => {
            state.loading = false;
            state.servers = action.payload;
        });
        builder.addCase(listAllServer.pending, (state: ServerState) => {
            state.loading = true;
        });
        builder.addCase(listAllServer.rejected, (state: ServerState) => {
            state.loading = false;
        });

        builder.addCase(getServerList.fulfilled, (state: ServerState, action) => {
            state.loading = false;
            state.servers = action.payload;
        });
        builder.addCase(getServerList.pending, (state: ServerState) => {
            state.loading = true;
        });
        builder.addCase(getServerList.rejected, (state: ServerState) => {
            state.loading = false;
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
export const {  updateServerTags } = serverSlice.actions;
