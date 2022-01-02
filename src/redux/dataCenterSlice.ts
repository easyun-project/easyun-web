import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataCenterService from '@/service/dataCenterService';
import { DataCenterModel, DefaultDataCenterModel } from '@/constant/dataCenter';

const updateDefaultDataCenter = 'dataCenter/updateDefaultDataCenterAction';


export const updateDefaultDataCenterAction = (defaultDataCenter): { payload: DefaultDataCenterModel; type: string } => {
    return {
        type: updateDefaultDataCenter,
        payload: defaultDataCenter,
    };
};

export const getDataCenter = createAsyncThunk(
    'dataCenter/getDataCenter',
    async (token: string) => {
        return await DataCenterService.getDataCenter(token);
    }
);

export const getDefaultDataCenter = createAsyncThunk(
    'dataCenter/getDefaultDataCenter',
    async (token: string) => {
        return await DataCenterService.getDefault(token);
    }
);

export interface DataCenterState {
    loading: boolean,
    dataCenter: DataCenterModel | undefined,
    defaultDataCenter: DefaultDataCenterModel | undefined,
}

const initialState: DataCenterState = {
    loading: true,
    dataCenter: undefined,
    defaultDataCenter: undefined
};


export const dataCenterSlice = createSlice({
    name: 'dataCenter',
    initialState,
    reducers: {
        updateDefaultDataCenterAction(state, action) {
            state.defaultDataCenter = action.payload;
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
    }
});
export default dataCenterSlice.reducer;
