import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BucketService, { BucketPathParam }from '@/service/stBucketService';
import { DcNameQueryParm } from '@/constant/dataCenter';
import { StBucketInfo, StBucketDetail } from '@/constant/storage';

//获取指定数据中心的Bucket列表
export const listAllBucket = createAsyncThunk(
    'storage/listAllBucket',
    async (params: DcNameQueryParm)  => {
        return await BucketService.listAllBucket(params);
    }
);

export const getBucketDetail = createAsyncThunk(
    'storage/getBucketDetail',
    async (params: BucketPathParam)  => {
        return await BucketService.getBucketDetail(params);
    }
);

export interface StBucketState {
    loading: boolean,
    bucketList: StBucketInfo[],
    currentBucket:StBucketDetail | 'loading' | 'failed'
}

const initialState: StBucketState = {
    loading: false,
    bucketList: [],
    currentBucket: 'loading',
};


export const stbucketSlice = createSlice({
    name: 'stbucket',
    initialState,
    reducers: {
        // 将storage直接置为传过来的值
        updateBucketList: (state, action) => {
            state.bucketList = action.payload;
        },

        // 删除指定name的值
        deleteBucket: (state, action) =>{
            for (let i = 0, len = state.bucketList.length; i < len; i++) {
                // 由于state使用了Proxy，所以不能直接获取到真实的值，需要把值转化出来
                const newBucketList = JSON.parse(JSON.stringify(state.bucketList));
                console.log(i, newBucketList, newBucketList[i]);
                // 遍历数组中的每一项，碰到需要删除的就删掉，然后结束循环。
                if (newBucketList[i]['Name'] === action.payload){
                    newBucketList.splice(i, 1);
                    state.bucketList = newBucketList;
                    break;
                }

            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listAllBucket.fulfilled, (state: StBucketState, action) => {
            state.loading = false;
            state.bucketList = action.payload;
        });
        builder.addCase(listAllBucket.pending, (state: StBucketState) => {
            state.loading = true;
        });
        builder.addCase(listAllBucket.rejected, (state: StBucketState) => {
            state.loading = false;
        });

        builder.addCase(getBucketDetail.pending, (state: StBucketState) => {
            state.currentBucket = 'loading';
        });
        builder.addCase(getBucketDetail.fulfilled, (state: StBucketState, action) => {
            state.currentBucket = action.payload;
        });
        builder.addCase(getBucketDetail.rejected, (state: StBucketState) => {
            state.currentBucket = 'failed';
        });
    }
});
export const { updateBucketList, deleteBucket } = stbucketSlice.actions;
export default stbucketSlice.reducer;
