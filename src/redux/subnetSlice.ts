import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SubnetService, { SubnetPathParam, SubnetDetail } from '@/service/dcmSubnetServices';
import { DcNameQueryParm, SubnetInfo } from '@/constant/dataCenter';


export interface SubnetState {
    loading: boolean,
    list: SubnetInfo[] | undefined,
    current: SubnetDetail | undefined,
}

const initialState: SubnetState = {
    loading: true,
    list: undefined,
    current: undefined,
};

export const listAllSubnet = createAsyncThunk(
    'subnet/listAllSubnet',
    async (params: DcNameQueryParm) => {
        return await SubnetService.listAll(params);
    }
);

export const getSubnetDetail = createAsyncThunk(
    'subnet/getSubnetDetail',
    async (params: SubnetPathParam) => {
        return await SubnetService.getDetail(params);
    }
);


export const subnetSlice = createSlice({
    name: 'subnet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // update datacenter subnet
        builder.addCase(listAllSubnet.pending, (state: SubnetState) => {
            state.loading = true;
        });
        builder.addCase(listAllSubnet.fulfilled, (state: SubnetState, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(listAllSubnet.rejected, (state: SubnetState) => {
            state.loading = false;
        });

        builder.addCase(getSubnetDetail.fulfilled, (state: SubnetState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getSubnetDetail.pending, (state: SubnetState) => {
            state.loading = true;
        });
        builder.addCase(getSubnetDetail.rejected, (state: SubnetState) => {
            state.loading = false;
        });
    }
});

export default subnetSlice.reducer;
// export const {  updateServerTags } = subnetSlice.actions;