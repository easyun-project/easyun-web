import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BucketCardInfo } from '@/components/Logic/CStorageCard/StBucketCard';
import bucketService, { GetBucketDetailParams }from '@/service/stBucketService';
import volumeService, { DcNameQueryParm } from '@/service/stVolumeService';
import { StBucketModel, VolumeInfo,StBucketDetailModel } from '@/constant/storage';

//获取指定数据中心的Bucket列表
export const listAllBucket = createAsyncThunk(
    'storage/listAllBucket',
    async (params: DcNameQueryParm)  => {
        return await bucketService.listAllBucket(params);
    }
);

export const listAllVolume = createAsyncThunk(
    'storage/listAllVolume',
    async (params: DcNameQueryParm)  => {
        return await volumeService.listAllVolume(params);
    }
);

export const getVolumeList = createAsyncThunk(
    'storage/getVolumeList',
    async (params: DcNameQueryParm)  => {
        return await volumeService.getVolumeList(params);
    }
);

export const getBucketDetail = createAsyncThunk(
    'storage/getBucketDetail',
    async (params: GetBucketDetailParams)  => {
        return await bucketService.getBucketDetail(params);
    }
);


export interface StorageState {
    loading: boolean,
    storageList: BucketCardInfo[],
    bucketList: StBucketModel[] ,
    volumeList: VolumeInfo[] ,
    currentBucket:StBucketDetailModel | 'loading' | 'failed'
}

const initialState: StorageState = {
    loading: true,
    storageList: [],
    bucketList: [],
    volumeList: [],
    currentBucket: 'loading',
};


export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        // 将storage直接置为传过来的值
        updateStorage: (state,action) => {
            state.storageList = action.payload;
        },
        updateVolumeList: (state,action) => {
            state.volumeList = action.payload;
        },

        // 删除指定name的值
        deleteStorage: (state,action) =>{
            for (let i = 0, len = state.storageList.length; i < len; i++) {
                // 由于state使用了Proxy，所以不能直接获取到真实的值，需要把值转化出来
                const nowStorageList = JSON.parse(JSON.stringify(state.storageList));
                console.log(i , nowStorageList, nowStorageList[i]);
                // 遍历数组中的每一项，碰到需要删除的就删掉，然后结束循环。
                if (nowStorageList[i]['Name'] === action.payload){
                    nowStorageList.splice(i,1);
                    state.storageList = nowStorageList;
                    break;
                }

            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listAllBucket.fulfilled, (state: StorageState, action) => {
            state.loading = false;
            state.bucketList = action.payload;
        });
        builder.addCase(listAllBucket.pending, (state: StorageState) => {
            state.loading = true;
        });
        builder.addCase(listAllBucket.rejected, (state: StorageState) => {
            state.loading = false;
        });
        builder.addCase(listAllVolume.fulfilled, (state: StorageState, action) => {
            state.loading = false;
            state.volumeList = action.payload;
        });
        builder.addCase(listAllVolume.pending, (state: StorageState) => {
            state.loading = true;
        });
        builder.addCase(listAllVolume.rejected, (state: StorageState) => {
            state.loading = false;
        });
        builder.addCase(getBucketDetail.pending, (state: StorageState) => {
            state.currentBucket = 'loading';
        });
        builder.addCase(getBucketDetail.fulfilled, (state: StorageState, action) => {
            state.currentBucket = action.payload;
        });
        builder.addCase(getBucketDetail.rejected, (state: StorageState) => {
            state.currentBucket = 'failed';
        });
    }
});
export const { updateStorage, deleteStorage, updateVolumeList } = storageSlice.actions;
export default storageSlice.reducer;
