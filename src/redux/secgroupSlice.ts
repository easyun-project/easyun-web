import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SecgroupService, { SecgroupPathParam, SecgroupDetail } from '@/service/dcmSecgroupServices';
import { DcNameQueryParm, SecurityGroupInfo } from '@/constant/dataCenter';


export interface SecGroupState {
    loading: boolean,
    list: SecurityGroupInfo[] | undefined,
    current: SecgroupDetail | undefined,
}

const initialState: SecGroupState = {
    loading: true,
    list: undefined,
    current: undefined,
};

export const listAllSecGroup = createAsyncThunk(
    'datacenter/listAllSecGroup',
    async (params: DcNameQueryParm) => {
        return await SecgroupService.listAll(params);
    }
);

export const getSecgroupDetail = createAsyncThunk(
    'datacenter/getSecgroupDetail',
    async (params: SecgroupPathParam) => {
        return await SecgroupService.getDetail(params);
    }
);

export const secgroupSlice = createSlice({
    name: 'secgroup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // update datacenter security group
        builder.addCase(listAllSecGroup.pending, (state: SecGroupState) => {
            state.loading = true;
        });
        builder.addCase(listAllSecGroup.fulfilled, (state: SecGroupState, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(getSecgroupDetail.fulfilled, (state: SecGroupState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getSecgroupDetail.pending, (state: SecGroupState) => {
            state.loading = true;
        });
        builder.addCase(getSecgroupDetail.rejected, (state: SecGroupState) => {
            state.loading = false;
        });

    }
});

export default secgroupSlice.reducer;
// export const {  updateServerTags } = secgroupSlice.actions;