import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1DatacenterRoutetableList, getApiV1DatacenterRoutetableByRtbId } from '@/api-client';


export interface RouteState {
    loading: boolean,
    list: any[],
    current: any | undefined,
}

const initialState: RouteState = {
    loading: true,
    list: [],
    current: undefined,
};

export const listAllRouteTable = createAsyncThunk(
    'datacenter/listAllRouteTable',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterRoutetableList();
        return data?.detail as any;
    }
);

export const getRouteTableDetail = createAsyncThunk(
    'datacenter/getStaticIpDetail',
    async (params: { dc: string; rtbId: string }) => {
        const { data } = await getApiV1DatacenterRoutetableByRtbId({ path: { rtb_id: params.rtbId } });
        return data?.detail as any;
    }
);

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listAllRouteTable.fulfilled, (state: RouteState, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(listAllRouteTable.pending, (state: RouteState) => {
            state.loading = true;
        });
        builder.addCase(listAllRouteTable.rejected, (state: RouteState) => {
            state.loading = false;
        });

        builder.addCase(getRouteTableDetail.fulfilled, (state: RouteState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getRouteTableDetail.pending, (state: RouteState) => {
            state.loading = true;
        });
        builder.addCase(getRouteTableDetail.rejected, (state: RouteState) => {
            state.loading = false;
        });
    }
});

export default routeSlice.reducer;
