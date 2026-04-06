import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1ServerList, getApiV1Server, getApiV1ServerDetailBySvrId } from '@/api-client';


export interface ServerState {
    loading: boolean,
    servers: any[],
    currentServer: any | undefined
}

const initialState: ServerState = {
    loading: true,
    servers: [],
    currentServer: undefined
};

export const listAllServer = createAsyncThunk(
    'server/listAllServer',
    async ({ dc }: { dc: string }) => {
        const { data } = await getApiV1ServerList({ query: { dc } });
        return data?.detail;
    }
);

export const getServerList = createAsyncThunk(
    'server/getServerList',
    async ({ dc }: { dc: string }) => {
        const { data } = await getApiV1Server({ query: { dc } });
        return data?.detail;
    }
);

export const getServerDetail = createAsyncThunk(
    'server/getServerDetail',
    async ({ serverId }: { serverId: string }) => {
        const { data } = await (getApiV1ServerDetailBySvrId as any)({ path: { svr_id: serverId } });
        return data?.detail;
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
            state.servers = action.payload as any;
        });
        builder.addCase(listAllServer.pending, (state: ServerState) => {
            state.loading = true;
        });
        builder.addCase(listAllServer.rejected, (state: ServerState) => {
            state.loading = false;
        });

        builder.addCase(getServerList.fulfilled, (state: ServerState, action) => {
            state.loading = false;
            state.servers = action.payload as any;
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
