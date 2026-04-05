import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiV1DatacenterSubnetList, getApiV1DatacenterSubnetBySubnetId } from '@/api-client';


export interface SubnetState {
    loading: boolean,
    list: any[] | undefined,
    current: any | undefined,
}

const initialState: SubnetState = {
    loading: true,
    list: undefined,
    current: undefined,
};

export const listAllSubnet = createAsyncThunk(
    'subnet/listAllSubnet',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterSubnetList({ query: { dc: params.dc } });
        return data?.detail as any;
    }
);

export const getSubnetDetail = createAsyncThunk(
    'subnet/getSubnetDetail',
    async (params: { dc: string; subnetId: string }) => {
        const { data } = await getApiV1DatacenterSubnetBySubnetId({ path: { subnet_id: params.subnetId }, query: { dc: params.dc } });
        return data?.detail as any;
    }
);


export const subnetSlice = createSlice({
    name: 'subnet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
