import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SubnetService, { SubnetPathParam, SubnetDetail } from '@/service/dcmSubnetServices';
import SecgroupService, { SecgroupPathParam, SecgroupDetail } from '@/service/dcmSecgroupServices';
import StaticIPService, { EipPathParam, EipDetail } from '@/service/dcmStaticipServices';
import { IntGatewayService, IntGWPathParam, IntGatewayDetail } from '@/service/dcmGatewayServices';
import { NatGatewayService, NatGWPathParam, NatGatewayDetail } from '@/service/dcmGatewayServices';


export interface NetworkState {
    loading: boolean,
    currentSubnet: SubnetDetail | undefined,
    currentIntGateway: IntGatewayDetail | undefined,
    currentNatGateway: NatGatewayDetail | undefined,
    currentSecgroup: SecgroupDetail | undefined,
    currentStaticIp: EipDetail | undefined,
}

const initialState: NetworkState = {
    loading: true,
    currentSubnet: undefined,
    currentIntGateway: undefined,
    currentNatGateway: undefined,
    currentSecgroup: undefined,
    currentStaticIp: undefined
};

export const getSubnetDetail = createAsyncThunk(
    'datacenter/getSubnetDetail',
    async (params: SubnetPathParam) => {
        return await SubnetService.getDetail(params);
    }
);

export const getIntGatewayDetail = createAsyncThunk(
    'datacenter/getIntGatewayDetail',
    async (params: IntGWPathParam) => {
        return await IntGatewayService.getDetail(params);
    }
);

export const getNatGatewayDetail = createAsyncThunk(
    'datacenter/getNatGatewayDetail',
    async (params: NatGWPathParam) => {
        return await NatGatewayService.getDetail(params);
    }
);

export const getSecgroupDetail = createAsyncThunk(
    'datacenter/getSecgroupDetail',
    async (params: SecgroupPathParam) => {
        return await SecgroupService.getDetail(params);
    }
);

export const getStaticIpDetail = createAsyncThunk(
    'datacenter/getStaticIpDetail',
    async (params: EipPathParam) => {
        return await StaticIPService.getDetail(params);
    }
);

export const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubnetDetail.fulfilled, (state: NetworkState, action) => {
            state.loading = false;
            state.currentSubnet = action.payload;
        });
        builder.addCase(getSubnetDetail.pending, (state: NetworkState) => {
            state.loading = true;
        });
        builder.addCase(getSubnetDetail.rejected, (state: NetworkState) => {
            state.loading = false;
        });

        builder.addCase(getIntGatewayDetail.fulfilled, (state: NetworkState, action) => {
            state.loading = false;
            state.currentIntGateway = action.payload;
        });
        builder.addCase(getIntGatewayDetail.pending, (state: NetworkState) => {
            state.loading = true;
        });
        builder.addCase(getIntGatewayDetail.rejected, (state: NetworkState) => {
            state.loading = false;
        });

        builder.addCase(getNatGatewayDetail.fulfilled, (state: NetworkState, action) => {
            state.loading = false;
            state.currentNatGateway = action.payload;
        });
        builder.addCase(getNatGatewayDetail.pending, (state: NetworkState) => {
            state.loading = true;
        });
        builder.addCase(getNatGatewayDetail.rejected, (state: NetworkState) => {
            state.loading = false;
        });

        builder.addCase(getSecgroupDetail.fulfilled, (state: NetworkState, action) => {
            state.loading = false;
            state.currentSecgroup = action.payload;
        });
        builder.addCase(getSecgroupDetail.pending, (state: NetworkState) => {
            state.loading = true;
        });
        builder.addCase(getSecgroupDetail.rejected, (state: NetworkState) => {
            state.loading = false;
        });

        builder.addCase(getStaticIpDetail.fulfilled, (state: NetworkState, action) => {
            state.loading = false;
            state.currentStaticIp = action.payload;
        });
        builder.addCase(getStaticIpDetail.pending, (state: NetworkState) => {
            state.loading = true;
        });
        builder.addCase(getStaticIpDetail.rejected, (state: NetworkState) => {
            state.loading = false;
        });
    }
});

export default networkSlice.reducer;
// export const {  updateServerTags } = networkSlice.actions;