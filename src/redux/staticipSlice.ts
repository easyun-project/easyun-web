import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1DatacenterStaticipList, getApiV1DatacenterStaticipByEipId } from '@/api-client';


export interface StaticIpState {
    loading: boolean,
    list: any[] | undefined,
    current: any | undefined,
}

const initialState: StaticIpState = {
    loading: true,
    list: undefined,
    current: undefined
};

export const listAllStaticIp = createAsyncThunk(
    'datacenter/listAllStaticIp',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterStaticipList({ query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const getStaticIpDetail = createAsyncThunk(
    'datacenter/getStaticIpDetail',
    async (params: { dc: string; eipId: string }) => {
        const { data } = await getApiV1DatacenterStaticipByEipId({ path: { eip_id: params.eipId }, query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const staticipSlice = createSlice({
    name: 'staticip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listAllStaticIp.pending, (state: StaticIpState) => {
            state.loading = true;
        });
        builder.addCase(listAllStaticIp.fulfilled, (state: StaticIpState, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(getStaticIpDetail.fulfilled, (state: StaticIpState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getStaticIpDetail.pending, (state: StaticIpState) => {
            state.loading = true;
        });
        builder.addCase(getStaticIpDetail.rejected, (state: StaticIpState) => {
            state.loading = false;
        });
    }
});

export default staticipSlice.reducer;
