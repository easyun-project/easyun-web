import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1DatacenterSecgroupList, getApiV1DatacenterSecgroupBySgId } from '@/api-client';


export interface SecGroupState {
    loading: boolean,
    list: any[] | undefined,
    current: any | undefined,
}

const initialState: SecGroupState = {
    loading: true,
    list: undefined,
    current: undefined,
};

export const listAllSecGroup = createAsyncThunk(
    'datacenter/listAllSecGroup',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterSecgroupList({ query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const getSecgroupDetail = createAsyncThunk(
    'datacenter/getSecgroupDetail',
    async (params: { dc: string; sgId: string }) => {
        const { data } = await getApiV1DatacenterSecgroupBySgId({ path: { sg_id: params.sgId }, query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const secgroupSlice = createSlice({
    name: 'secgroup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listAllSecGroup.pending, (state: SecGroupState) => {
            state.loading = true;
        });
        builder.addCase(listAllSecGroup.fulfilled, (state: SecGroupState, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(getSecgroupDetail.fulfilled, (state: SecGroupState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getSecgroupDetail.pending, (state: SecGroupState) => {
            state.loading = true;
        });
        builder.addCase(getSecgroupDetail.rejected, (state: SecGroupState) => {
            state.loading = false;
        });
    }
});

export default secgroupSlice.reducer;
