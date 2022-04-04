import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataCenterService, { DcNameQueryParm } from '@/service/dataCenterService';
import {
    DefaultDataCenterParms,
    DataCenterModel,
    SecurityGroupInfoSimple,
    EipInfo,
    SubnetInfo,
    Region
} from '@/constant/dataCenter';

const updateDefaultDataCenter = 'dataCenter/updateDefaultDataCenterAction';


export const updateDefaultDataCenterAction = (defaultDataCenter): { payload: DefaultDataCenterParms; type: string } => {
    return {
        type: updateDefaultDataCenter,
        payload: defaultDataCenter,
    };
};

//获取Easyun数据中心列表
export const listDataCenter = createAsyncThunk(
    'dataCenter/getDataCenter',
    async () => {
        return await DataCenterService.listDataCenter();
    }
);

//新建数据中心的默认参数
export const getDataCenterParms = createAsyncThunk(
    'dataCenter/getDataCenterParms',
    async (dcName?: string) => {
        return await DataCenterService.getDefaultDcParms(dcName);
    }
);

//新建数据中心的默认参数
export const getDatacenterRegion = createAsyncThunk(
    'dataCenter/region',
    async () => {
        return await DataCenterService.getDatacenterRegion();
    }
);


//获取指定数据中心(VPC)相关信息
export const getDataCenter = createAsyncThunk(
    'dataCenter/getDataCenter',
    async (params: DcNameQueryParm) => {
        return await DataCenterService.getDataCenter(params);
    }
);

export const deleteDataCenter = createAsyncThunk(
    'dataCenter/deleteDataCenter',
    async (dcName: string) => {
        return await DataCenterService.deleteDataCenter(dcName);
    }
);

export const getDataCenterSubnet = createAsyncThunk(
    'dataCenter/getDataCenterSubnet',
    async (params: {dc:string}) => {
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
    region: Region[] | undefined,
    defaultDcParams: DefaultDataCenterParms | undefined,
    currentDC: {
            basicInfo: DataCenterModel | undefined,
            secgroup: SecurityGroupInfoSimple[] | undefined
            eip: EipInfo[] | undefined
            subnet: SubnetInfo[] |undefined
        }
}

const initialState: DataCenterState = {
    loading: true,
    // dataCenter: undefined,
    dataCenterList: undefined,
    defaultDcParams: undefined,
    region: undefined,
    currentDC: {
        basicInfo: undefined,
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
        getRegion(state, action) {
            state.region = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listDataCenter.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.dataCenterList = action.payload;
        });
        builder.addCase(listDataCenter.pending, (state: DataCenterState) => {
            state.loading = true;
        });

        builder.addCase(getDataCenterParms.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.defaultDcParams = action.payload;
        });
        builder.addCase(getDataCenterParms.pending, (state: DataCenterState) => {
            state.loading = true;
        });

        builder.addCase(getDataCenterSecgroup.fulfilled, (state: DataCenterState, action) => {
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
        builder.addCase(getDatacenterRegion.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDatacenterRegion.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.region = action.payload;
        });
        builder.addCase(getDatacenterRegion.rejected, (state: DataCenterState) => {
            state.loading = false;
        });
    }
});
export default dataCenterSlice.reducer;
export const { updateCurrentDC } = dataCenterSlice.actions;
