import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1DatacenterGatewayNat, getApiV1DatacenterGatewayNatByNatgwId } from '@/api-client';


export interface NatGatewayState {
    loading: boolean,
    list: any[] | undefined,
    current: any | undefined,
}

const initialState: NatGatewayState = {
    loading: true,
    list: undefined,
    current: undefined,
};

export const listAllNatGateway = createAsyncThunk(
    'datacenter/listAllNatGateway',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterGatewayNat({ query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const getNatGatewayDetail = createAsyncThunk(
    'datacenter/getNatGatewayDetail',
    async (params: { dc: string; natgwId: string }) => {
        const { data } = await getApiV1DatacenterGatewayNatByNatgwId({ path: { natgw_id: params.natgwId }, query: { dc: params.dc } });
        return data?.detail as any;
    }
);


export const natgatewaySlice = createSlice({
    name: 'natgateway',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listAllNatGateway.pending, (state: NatGatewayState) => {
            state.loading = true;
        });
        builder.addCase(listAllNatGateway.fulfilled, (state: NatGatewayState, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(listAllNatGateway.rejected, (state: NatGatewayState) => {
            state.loading = false;
            state.list = [];
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
