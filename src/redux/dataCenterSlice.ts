import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataCenterService, { DcNameQueryParm, DcDefaultQueryParm,  } from '@/service/dataCenterService';
import {
    DefaultDataCenterParms,
    DataCenterModel,
    DataCenterSummary,
    DeleteDcParm,
    SecurityGroupInfoSimple,
    EipInfo,
    SubnetInfo,
    RegionItem
} from '@/constant/dataCenter';

const updateDefaultDataCenter = 'dataCenter/updateDefaultDataCenterAction';


export const updateDefaultDataCenterAction = (defaultDataCenter): { payload: DefaultDataCenterParms; type: string } => {
    return {
        type: updateDefaultDataCenter,
        payload: defaultDataCenter,
    };
};


export interface DefaultDataCenterParams {
    dcName: string;
    regionCode: string
}


//获取AWS Region信息
export const getRegionList = createAsyncThunk(
    'dataCenter/region',
    async () => {
        return await DataCenterService.getRegionList();
    }
);


//获取Easyun数据中心列表
export const listAllDataCenter = createAsyncThunk(
    'dataCenter/listDataCenter',
    async () => {
        return await DataCenterService.listDataCenter();
    }
);

//获取新建数据中心的默认参数
export const getDataCenterParams = createAsyncThunk(
    'dataCenter/getDataCenterParms',
    async (params: DcDefaultQueryParm) => {
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

export const deleteDataCenter = createAsyncThunk(
    'dataCenter/deleteDataCenter',
    async (params: DeleteDcParm) => {
        return await DataCenterService.deleteDataCenter(params);
    }
);

export const getDataCenterSubnet = createAsyncThunk(
    'dataCenter/getDataCenterSubnet',
    async (params: { dc: string }) => {
        return await DataCenterService.getSubnet(params);
    }
);

export const getDataCenterSecgroup = createAsyncThunk(
    'dataCenter/getDataCenterSecgroup',
    async (params: DcNameQueryParm) => {
        return await DataCenterService.listSecgroup(params);
    }
);

export const getDataCenterEip = createAsyncThunk(
    'dataCenter/getDataCenterEip',
    async (params: DcNameQueryParm) => {
        return await DataCenterService.getEipInfo(params);
    }
);

export interface DataCenterState {
    loading: boolean,
    // dataCenter: DataCenterDetail | undefined,
    dataCenterList: DataCenterModel[] | undefined,
    regionList: RegionItem[] | undefined,
    defaultDcParams: DefaultDataCenterParms | undefined,
    currentDC: {
        basicInfo: DataCenterModel | undefined,
        summary: DataCenterSummary | undefined,
        secgroup: SecurityGroupInfoSimple[] | undefined
        eip: EipInfo[] | undefined
        subnet: SubnetInfo[] | undefined
    }
}

const initialState: DataCenterState = {
    loading: true,
    // dataCenter: undefined,
    dataCenterList: undefined,
    defaultDcParams: undefined,
    regionList: undefined,
    currentDC: {
        basicInfo: undefined,
        summary: undefined,
        secgroup: undefined,
        eip: undefined,
        subnet: undefined
    }
};


export const dataCenterSlice = createSlice({
    name: 'dataCenter',
    initialState,
    reducers: {
        updateDefaultDataCenterAction(state, action) {
            state.defaultDcParams = action.payload;
        },
        updateCurrentDC(state, action) {
            state.currentDC.basicInfo = action.payload;
        },
        updateRegionList(state, action) {
            state.regionList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRegionList.fulfilled, (state: DataCenterState, action) => {
            state.regionList = action.payload;
        });

        builder.addCase(listAllDataCenter.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(listAllDataCenter.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.dataCenterList = action.payload;
        });
        builder.addCase(listAllDataCenter.rejected, (state: DataCenterState) => {
            state.loading = false;
        });

        builder.addCase(getDataCenterParams.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDataCenterParams.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.defaultDcParams = action.payload;
        });
        builder.addCase(getDataCenterParams.rejected, (state: DataCenterState) => {
            state.loading = false;
        });

        builder.addCase(getDatacenterSummary.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDatacenterSummary.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.currentDC.summary = action.payload;
        });
        builder.addCase(getDatacenterSummary.rejected, (state: DataCenterState) => {
            state.loading = false;
        });

        builder.addCase(getDataCenterSecgroup.fulfilled, (state: DataCenterState, action) => {
            // state.loading = false;
            state.currentDC.secgroup = action.payload;
        });

        builder.addCase(getDataCenterEip.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDataCenterEip.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.currentDC.eip = action.payload;
        });
        builder.addCase(getDataCenterEip.rejected, (state: DataCenterState) => {
            state.loading = false;
        });

        builder.addCase(getDataCenterSubnet.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDataCenterSubnet.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.currentDC.subnet = action.payload;
        });
        builder.addCase(getDataCenterSubnet.rejected, (state: DataCenterState) => {
            state.loading = false;
        });
    }
});
export default dataCenterSlice.reducer;
export const { updateCurrentDC } = dataCenterSlice.actions;
