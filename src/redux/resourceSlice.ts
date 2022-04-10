import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DcResourceService,  { DcNameQueryParm } from '@/service/resourceServices';
import {
    ResourceSummary,
    CostSummary,
} from '@/constant/resource';



//获取指定数据中心云资源（resource）概要
export const getResourceSummary = createAsyncThunk(
    'dataCenter/getResourceSummary',
    async (params: DcNameQueryParm) => {
        return await DcResourceService.getResourceSummary(params);
    }
);

//获取指定数据中心成本（cost&usage）概要
export const getCostSummary = createAsyncThunk(
    'dataCenter/getCostSummary',
    async (params: DcNameQueryParm) => {
        return await DcResourceService.getCostSummary(params);
    }
);


export interface ResourceState {
    loading: boolean
    resourceSummary: ResourceSummary | undefined
    costSummary: CostSummary | undefined
}

const initialState: ResourceState = {
    loading: true,
    resourceSummary: undefined,
    costSummary: undefined
};


export const resourceSlice = createSlice({
    name: 'resource',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResourceSummary.pending, (state: ResourceState) => {
            state.loading = true;
        });
        builder.addCase(getResourceSummary.fulfilled, (state: ResourceState, action) => {
            state.loading = false;
            state.resourceSummary = action.payload;
        });        
        builder.addCase(getResourceSummary.rejected, (state: ResourceState) => {
            state.loading = false;
        });

        builder.addCase(getCostSummary.pending, (state: ResourceState) => {
            state.loading = true;
        });
        builder.addCase(getCostSummary.fulfilled, (state: ResourceState, action) => {
            state.loading = false;
            state.costSummary = action.payload;
        });        
        builder.addCase(getCostSummary.rejected, (state: ResourceState) => {
            state.loading = false;
        });
    }
});
export default resourceSlice.reducer;
