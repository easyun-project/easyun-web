import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getApiV1DatacenterRegion,
    getApiV1DatacenterList,
    getApiV1DatacenterDefault,
    getApiV1DatacenterSummaryBasic,
    getApiV1DatacenterSummaryResource,
    getApiV1DatacenterSummaryCost,
    deleteApiV1Datacenter,
} from '@/api-client';
import type {
    RegionModel,
    DataCenterModel,
    DefaultParmsOut,
    DcSummaryBasicOut,
    DcResSummaryOut,
    DcCostSummaryOut,
} from '@/api-client';

export const getRegionList = createAsyncThunk('cloud/region', async () => {
    const { data } = await getApiV1DatacenterRegion();
    return data?.detail as RegionModel[] | undefined;
});

export const listAllDataCenter = createAsyncThunk('cloud/listDataCenter', async () => {
    const { data } = await getApiV1DatacenterList();
    return data?.detail as DataCenterModel[] | undefined;
});

export const getDataCenterParams = createAsyncThunk(
    'cloud/getDataCenterParms',
    async () => {
        const { data } = await getApiV1DatacenterDefault();
        return data?.detail as DefaultParmsOut | undefined;
    }
);

export const getDatacenterSummary = createAsyncThunk(
    'dataCenter/getDataCenterSummary',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterSummaryBasic();
        return data?.detail as DcSummaryBasicOut | undefined;
    }
);

export const getResourceSummary = createAsyncThunk(
    'dataCenter/getResourceSummary',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterSummaryResource();
        return data?.detail as DcResSummaryOut | undefined;
    }
);

export const getCostSummary = createAsyncThunk(
    'dataCenter/getCostSummary',
    async (params: { dc: string }) => {
        const { data } = await getApiV1DatacenterSummaryCost();
        return data?.detail as DcCostSummaryOut | undefined;
    }
);

export const deleteDataCenter = createAsyncThunk(
    'dataCenter/deleteDataCenter',
    async (params: { dcName: string; isForceDel?: boolean }) => {
        const { data } = await deleteApiV1Datacenter({ body: params });
        return data?.task;
    }
);

export interface DataCenterState {
    loading: boolean;
    regionList: RegionModel[] | undefined;
    datacenterParams: DefaultParmsOut | undefined;
    list: DataCenterModel[] | undefined;
    current: DataCenterModel | undefined;
    summary: {
        datacenter: DcSummaryBasicOut | undefined;
        resource: DcResSummaryOut | undefined;
        cost: DcCostSummaryOut | undefined;
    };
}

const initialState: DataCenterState = {
    loading: true,
    regionList: undefined,
    datacenterParams: undefined,
    list: undefined,
    current: undefined,
    summary: { datacenter: undefined, resource: undefined, cost: undefined },
};

export const datacenterSlice = createSlice({
    name: 'datacenter',
    initialState,
    reducers: {
        updateRegionList(state, action) { state.regionList = action.payload; },
        updateDataCenterParams(state, action) { state.datacenterParams = action.payload; },
        updateCurrentDC(state, action) { state.current = action.payload; },
    },
    extraReducers: (builder) => {
        builder.addCase(getDataCenterParams.pending, (state) => { state.loading = true; });
        builder.addCase(getDataCenterParams.fulfilled, (state, action) => { state.loading = false; state.datacenterParams = action.payload; });
        builder.addCase(getDataCenterParams.rejected, (state) => { state.loading = false; });

        builder.addCase(listAllDataCenter.pending, (state) => { state.loading = true; });
        builder.addCase(listAllDataCenter.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; });
        builder.addCase(listAllDataCenter.rejected, (state) => { state.loading = false; });

        builder.addCase(getDatacenterSummary.pending, (state) => { state.loading = true; });
        builder.addCase(getDatacenterSummary.fulfilled, (state, action) => { state.loading = false; state.summary.datacenter = action.payload; });
        builder.addCase(getDatacenterSummary.rejected, (state) => { state.loading = false; });

        builder.addCase(getResourceSummary.pending, (state) => { state.loading = true; });
        builder.addCase(getResourceSummary.fulfilled, (state, action) => { state.loading = false; state.summary.resource = action.payload; });
        builder.addCase(getResourceSummary.rejected, (state) => { state.loading = false; });

        builder.addCase(getCostSummary.pending, (state) => { state.loading = true; });
        builder.addCase(getCostSummary.fulfilled, (state, action) => { state.loading = false; state.summary.cost = action.payload; });
        builder.addCase(getCostSummary.rejected, (state) => { state.loading = false; });

        builder.addCase(getRegionList.fulfilled, (state, action) => { state.regionList = action.payload; });
    },
});

export const { updateCurrentDC } = datacenterSlice.actions;
export default datacenterSlice.reducer;
