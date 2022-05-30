import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BucketCardInfo } from '@/components/Logic/CStorageCard/StBucketCard';
// import databaseService, { GetDbDetailParams }from '@/service/databaseService';
import volumeService, { DcNameQueryParm } from '@/service/stVolumeService';
import { StBucketModel, VolumeInfo, StBucketDetailModel } from '@/constant/storage';

//获取指定数据中心的Bucket列表
export const listAllDatabase = createAsyncThunk(
    'storage/listAllBucket',
    async (params: DcNameQueryParm) => {
        return await volumeService.listAllVolume(params);
    }
);


export interface DatabaseState {
    loading: boolean,
    dbInstanceList: BucketCardInfo[],
    dbClusterList: StBucketModel[],
    currentDbInstance: StBucketDetailModel | undefined
}

const initialState: DatabaseState = {
    loading: true,
    dbInstanceList: [],
    dbClusterList: [],
    currentDbInstance: undefined
};


export const databaseSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        // 将storage直接置为传过来的值
        updateDbList: (state, action) => {
            state.dbInstanceList = action.payload;
        },

        // 删除指定name的值
        deleteStorage: (state, action) => {
            for (let i = state.dbInstanceList.length; i > 0; i--) {
                // 由于state使用了Proxy，所以不能直接获取到真实的值，需要把值转化出来
                const nowStorageList = JSON.parse(JSON.stringify(state.dbInstanceList));
                console.log(i, nowStorageList, nowStorageList[i]);
                // 遍历数组中的每一项，碰到需要删除的就删掉，然后结束循环。
                if (nowStorageList[i]['Name'] === action.payload) {
                    nowStorageList.splice(i, 1);
                    state.dbInstanceList = nowStorageList;
                    break;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listAllDatabase.fulfilled, (state: DatabaseState, action) => {
            state.loading = false;
            state. = action.payload;
        });
        builder.addCase(listAllDatabase.pending, (state: DatabaseState) => {
            state.loading = true;
        });
        builder.addCase(listAllDatabase.rejected, (state: DatabaseState) => {
            state.loading = false;
        });

    }
});
export const { updateDbList, deleteStorage, updateVolumeList } = databaseSlice.actions;
export default databaseSlice.reducer;
