import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GatewayService, { NatGWPathParam, NatGatewayDetail } from '@/service/dcmGatewayServices';
import { NatGatewayInfo } from '@/constant/dataCenter';


export interface NatGatewayState {
    loading: boolean,
    list: NatGatewayInfo[] | undefined,
    current: NatGatewayDetail | undefined,
}

const initialState: NatGatewayState = {
    loading: false,
    list: undefined,
    current: undefined,
};

export const listAllNatGateway = createAsyncThunk(
    'datacenter/listAllNatGateway',
    async (params: { dc: string }) => {
        return await GatewayService.listAllNatGW(params);
    }
);

export const getNatGatewayDetail = createAsyncThunk(
    'datacenter/getNatGatewayDetail',
    async (params: NatGWPathParam) => {
        return await GatewayService.getNatGWDetail(params);
    }
);


export const natgatewaySlice = createSlice({
    name: 'natgateway',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // update datacenter NAT Gateway
        builder.addCase(listAllNatGateway.pending, (state: NatGatewayState) => {
            state.loading = true;
        });
        builder.addCase(listAllNatGateway.fulfilled, (state: NatGatewayState, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(getNatGatewayDetail.fulfilled, (state: NatGatewayState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getNatGatewayDetail.pending, (state: NatGatewayState) => {
            state.loading = true;
        });
        builder.addCase(getNatGatewayDetail.rejected, (state: NatGatewayState) => {
            state.loading = false;
        });

    }
});

export default natgatewaySlice.reducer;
// export const {  updateServerTags } = natgatewaySlice.actions;