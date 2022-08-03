import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StaticIPService, { EipPathParam, EipDetail } from '@/service/dcmStaticipServices';
import { DcNameQueryParm, StaticIpInfo } from '@/constant/dataCenter';


export interface StaticIpState {
    loading: boolean,
    list: StaticIpInfo[] | undefined,
    current: EipDetail | undefined,
}

const initialState: StaticIpState = {
    loading: false,
    list: undefined,
    current: undefined
};

export const listAllStaticIp = createAsyncThunk(
    'datacenter/listAllStaticIp',
    async (params: DcNameQueryParm) => {
        return await StaticIPService.listAll(params);
    }
);

export const getStaticIpDetail = createAsyncThunk(
    'datacenter/getStaticIpDetail',
    async (params: EipPathParam) => {
        return await StaticIPService.getDetail(params);
    }
);

export const staticipSlice = createSlice({
    name: 'staticip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // update datacenter Statip Ip
        builder.addCase(listAllStaticIp.pending, (state: StaticIpState) => {
            state.loading = true;
        });
        builder.addCase(listAllStaticIp.fulfilled, (state: StaticIpState, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(getStaticIpDetail.fulfilled, (state: StaticIpState, action) => {
            state.loading = false;
            state.current = action.payload;
        });
        builder.addCase(getStaticIpDetail.pending, (state: StaticIpState) => {
            state.loading = true;
        });
        builder.addCase(getStaticIpDetail.rejected, (state: StaticIpState) => {
            state.loading = false;
        });
    }
});

export default staticipSlice.reducer;
// export const {  updateServerTags } = staticipSlice.actions;