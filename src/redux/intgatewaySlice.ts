import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1DatacenterGatewayInternet, getApiV1DatacenterGatewayInternetByIgwId } from '@/api-client';


export interface IntGatewayState {
    loading: boolean,
    list: any[] | undefined,
    current: any | undefined,
}

const initialState: IntGatewayState = {
    loading: true,
    list: undefined,
    current: undefined,
};

export const listAllIntGateway = createAsyncThunk(
    'datacenter/getDataCenterIntGateway',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterGatewayInternet({ query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const getIntGatewayDetail = createAsyncThunk(
    'datacenter/getIntGatewayDetail',
    async (params: { dc: string; igwId: string }) => {
        const { data } = await getApiV1DatacenterGatewayInternetByIgwId({ path: { igw_id: params.igwId }, query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const intgatewaySlice = createSlice({
    name: 'intgateway',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
