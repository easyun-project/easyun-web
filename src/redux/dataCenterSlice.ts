import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataCenterService from '@/service/dataCenterService';
import {
    DcNameQueryParm,
    QueryNewDcParm,
    DefaultDataCenterParms,
    DataCenterModel,
    DataCenterSummary,
    ResourceSummary,
    CostSummary,
    DeleteDcParm,
    RegionItem
} from '@/constant/dataCenter';


//获取AWS Region信息
export const getRegionList = createAsyncThunk(
    'cloud/region',
    async () => {
        return await DataCenterService.getRegionList();
    }
);

//获取Easyun数据中心列表
export const listAllDataCenter = createAsyncThunk(
    'cloud/listDataCenter',
    async () => {
        return await DataCenterService.listDataCenter();
    }
);

//获取新建数据中心的默认参数
export const getDataCenterParams = createAsyncThunk(
    'cloud/getDataCenterParms',
    async (params: QueryNewDcParm) => {
        return await DataCenterService.getDefaultDcParams(params);
    }
);

//获取指定数据中心(VPC)相关信息
export const getDatacenterSummary = createAsyncThunk(
    'dataCenter/getDataCenterSummary',
    async (params: DcNameQueryParm) => {
        return await DataCenterService.getDataCenterVpc(params);
    }
);

//获取指定数据中心云资源（resource）概要
export const getResourceSummary = createAsyncThunk(
    'dataCenter/getResourceSummary',
    async (params: DcNameQueryParm) => {
        return await DataCenterService.getResourceSummary(params);
    }
);

//获取指定数据中心成本（cost&usage）概要
export const getCostSummary = createAsyncThunk(
    'dataCenter/getCostSummary',
    async (params: DcNameQueryParm) => {
        return await DataCenterService.getCostSummary(params);
    }
);

//删除指定数据中心(VPC)
export const deleteDataCenter = createAsyncThunk(
    'dataCenter/deleteDataCenter',
    async (params: DeleteDcParm) => {
        return await DataCenterService.deleteDataCenter(params);
    }
);

export interface DataCenterState {
    loading: boolean,
    regionList: RegionItem[] | undefined,
    datacenterParams: DefaultDataCenterParms | undefined,
    list: DataCenterModel[] | undefined,
    current: DataCenterModel | undefined,
    summary: {
        datacenter: DataCenterSummary | undefined,
        resource: ResourceSummary | undefined,
        cost: CostSummary | undefined
    }
}

const initialState: DataCenterState = {
    loading: true,
    regionList: undefined,
    datacenterParams: undefined,
    list: undefined,
    current: undefined,
    summary: {
        datacenter: undefined,
        resource: undefined,
        cost: undefined
    }
};

export const datacenterSlice = createSlice({
    name: 'datacenter',
    initialState,
    reducers: {
        // get/update Region list
        updateRegionList(state, action) {
            state.regionList = action.payload;
        },
        updateDataCenterParams(state, action) {
            state.datacenterParams = action.payload;
        },
        updateCurrentDC(state, action) {
            state.current = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getDataCenterParams.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDataCenterParams.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.datacenterParams = action.payload;
        });
        builder.addCase(getDataCenterParams.rejected, (state: DataCenterState) => {
            state.loading = false;
        });
        // update datacenter list
        builder.addCase(listAllDataCenter.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(listAllDataCenter.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(listAllDataCenter.rejected, (state: DataCenterState) => {
            state.loading = false;
        });
        // get datacenter summary
        builder.addCase(getDatacenterSummary.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDatacenterSummary.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.summary.datacenter = action.payload;
        });
        builder.addCase(getDatacenterSummary.rejected, (state: DataCenterState) => {
            state.loading = false;
        });

        builder.addCase(getResourceSummary.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getResourceSummary.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.summary.resource = action.payload;
        });
        builder.addCase(getResourceSummary.rejected, (state: DataCenterState) => {
            state.loading = false;
        });

        builder.addCase(getCostSummary.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getCostSummary.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.summary.cost = action.payload;
        });
        builder.addCase(getCostSummary.rejected, (state: DataCenterState) => {
            state.loading = false;
        });
    }
});

export const {  updateCurrentDC } = datacenterSlice.actions;

export default datacenterSlice.reducer;