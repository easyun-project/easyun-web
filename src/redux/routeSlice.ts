import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RouteService, { RoutetabPathParam, RouteTableDetail } from '@/service/dcmRouteService';
import { DcNameQueryParm, RouteTableInfo } from '@/constant/dataCenter';


export interface RouteState {
    loading: boolean,
    list: RouteTableInfo[],
    current: RouteTableDetail | undefined,
}

const initialState: RouteState = {
    loading: true,
    list: [],
    current: undefined,
};

export const listAllRouteTable = createAsyncThunk(
    'datacenter/listAllRouteTable',
    async (params: DcNameQueryParm) => {
        return await RouteService.listAll(params);
    }
);

export const getRouteTableDetail = createAsyncThunk(
    'datacenter/getStaticIpDetail',
    async (params: RoutetabPathParam) => {
        return await RouteService.getDetail(params);
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
// export const {  updateServerTags } = routeSlice.actions;