import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import loadbalancerService, { GetDbDetailParams }from '@/service/loadbalancerService';
import LoadbalancerService, { DcNameQueryParm } from '@/service/loadbalancerService';
import { ElbModel, ElbDetail } from '@/constant/loadbalancer';


export interface LoadbalancerState {
    loading: boolean,
    list: ElbModel[],
    current: ElbDetail | undefined
}

const initialState: LoadbalancerState = {
    loading: true,
    list: [],
    current: undefined
};

//获取指定数据中心的Loadbalancer列表
export const listAllLoadbalancer = createAsyncThunk(
    'storage/listAllLoadbalancer',
    async (params: DcNameQueryParm) => {
        return await LoadbalancerService.listAll(params);
    }
);

export const loadbalancerSlice = createSlice({
    name: 'loadbalancer',
    initialState,
    reducers: {
        // 将loadbalancer直接置为传过来的值
        updateElbList: (state, action) => {
            state.list = action.payload;
        },

        // 删除指定name的值
        deleteElb: (state, action) => {
            for (let i = state.list.length; i > 0; i--) {
                // 由于state使用了Proxy，所以不能直接获取到真实的值，需要把值转化出来
                const newElbList = JSON.parse(JSON.stringify(state.list));
                console.log(i, newElbList, newElbList[i]);
                // 遍历数组中的每一项，碰到需要删除的就删掉，然后结束循环。
                if (newElbList[i]['Name'] === action.payload) {
                    newElbList.splice(i, 1);
                    state.list = newElbList;
                    break;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listAllLoadbalancer.fulfilled, (state: LoadbalancerState, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(listAllLoadbalancer.pending, (state: LoadbalancerState) => {
            state.loading = true;
        });
        builder.addCase(listAllLoadbalancer.rejected, (state: LoadbalancerState) => {
            state.loading = false;
        });

    }
});
export const { updateElbList, deleteElb } = loadbalancerSlice.actions;
export default loadbalancerSlice.reducer;
