import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataCenterService, { DatacenterParams } from '@/service/dataCenterService';
import { DataCenterModel, DefaultDataCenterModel,DataCenterInfo, SecurityGroupInfoSimple,EipInfo } from '@/constant/dataCenter';

const updateDefaultDataCenter = 'dataCenter/updateDefaultDataCenterAction';


export const updateDefaultDataCenterAction = (defaultDataCenter): { payload: DefaultDataCenterModel; type: string } => {
    return {
        type: updateDefaultDataCenter,
        payload: defaultDataCenter,
    };
};

export const getDataCenter = createAsyncThunk(
    'dataCenter/getDataCenter',
    async () => {
        return await DataCenterService.getDataCenter();
    }
);

export const getDefaultDataCenter = createAsyncThunk(
    'dataCenter/getDefaultDataCenter',
    async (dcName?: string) => {
        return await DataCenterService.getDefault(dcName);
    }
);

export const getDataCenterSecgroup = createAsyncThunk(
    'dataCenter/getDataCenterSecgroup',
    async (params: DatacenterParams) => {
        return await DataCenterService.listSecgroup(params);
    }
);

export const getDataCenterEip = createAsyncThunk(
    'dataCenter/getDataCenterEip',
    async (params: DatacenterParams) => {
        return await DataCenterService.getEipInfo(params);});

export const deleteDataCenter = createAsyncThunk(
    'dataCenter/deleteDataCenter',
    async (dcName: string) => {
        return await DataCenterService.deleteDataCenter(dcName);
    }
);

export interface DataCenterState {
    loading: boolean,
    dataCenter: DataCenterModel | undefined,
    defaultDataCenter: DefaultDataCenterModel | undefined,
    currentDc:
        {
            basicInfo: DataCenterInfo | undefined,
            secgroup: SecurityGroupInfoSimple[] | undefined
            eip: EipInfo[] | undefined
        }
}

const initialState: DataCenterState = {
    loading: true,
    dataCenter: undefined,
    defaultDataCenter: undefined,
    currentDc: {
        basicInfo: undefined,
        secgroup: undefined,
        eip: undefined
    }
};


export const dataCenterSlice = createSlice({
    name: 'dataCenter',
    initialState,
    reducers: {
        updateDefaultDataCenterAction(state, action) {
            state.defaultDataCenter = action.payload;
        },
        updateCurrentDc(state, action) {
            state.currentDc.basicInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDataCenter.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.dataCenter = action.payload;
        });
        builder.addCase(getDataCenter.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDefaultDataCenter.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.defaultDataCenter = action.payload;
        });
        builder.addCase(getDefaultDataCenter.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDataCenterSecgroup.fulfilled, (state: DataCenterState, action) => {
            state.currentDc.secgroup = action.payload;
        });
        builder.addCase(getDataCenterEip.pending, (state: DataCenterState) => {
            state.loading = true;
        });
        builder.addCase(getDataCenterEip.fulfilled, (state: DataCenterState, action) => {
            state.loading = false;
            state.currentDc.eip = action.payload;
        });
        builder.addCase(getDataCenterEip.rejected, (state: DataCenterState) => {
            state.loading = false;
        });
    }
});
export default dataCenterSlice.reducer;
export const { updateCurrentDc } = dataCenterSlice.actions;
