import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GatewayService, { IntGWPathParam, IntGatewayDetail } from '@/service/dcmGatewayServices';
import { IntGatewayInfo } from '@/constant/dataCenter';


export interface IntGatewayState {
    loading: boolean,
    list: IntGatewayInfo[] | undefined,
    current: IntGatewayDetail | undefined,
}

const initialState: IntGatewayState = {
    loading: false,
    list: undefined,
    current: undefined,
};

export const listAllIntGateway = createAsyncThunk(
    'datacenter/getDataCenterIntGateway',
    async (params: { dc: string }) => {
        return await GatewayService.listAllIntGw(params);
    }
);

export const getIntGatewayDetail = createAsyncThunk(
    'datacenter/getIntGatewayDetail',
    async (params: IntGWPathParam) => {
        return await GatewayService.getIntGWDetail(params);
    }
);

export const intgatewaySlice = createSlice({
    name: 'intgateway',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // update datacenter Internet Gateway
        builder.addCase(listAllIntGateway.pending, (state: IntGatewayState) => {
            state.loading = true;
        });
        builder.addCase(listAllIntGateway.fulfilled, (state: IntGatewayState, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(getIntGatewayDetail.fulfilled, (state: IntGatewayState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getIntGatewayDetail.pending, (state: IntGatewayState) => {
            state.loading = true;
        });
        builder.addCase(getIntGatewayDetail.rejected, (state: IntGatewayState) => {
            state.loading = false;
        });
    }
});

export default intgatewaySlice.reducer;
// export const {  updateServerTags } = intgatewaySlice.actions;