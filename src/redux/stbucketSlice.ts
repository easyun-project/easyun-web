import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApiV1StorageBucketList, getApiV1StorageBucketByBucketId } from '@/api-client';

//获取指定数据中心的Bucket列表
export const listAllBucket = createAsyncThunk(
    'storage/listAllBucket',
    async ({ dc }: { dc: string }) => {
        const { data } = await getApiV1StorageBucketList();
        return data?.detail;
    }
);

export const getBucketDetail = createAsyncThunk(
    'storage/getBucketDetail',
    async ({ bucketId, dc }: { bucketId: string; dc: string }) => {
        const { data } = await getApiV1StorageBucketByBucketId({ path: { bucket_id: bucketId } });
        return data?.detail;
    }
);

export interface StBucketState {
    loading: boolean,
    bucketList: any[],
    currentBucket: any | 'loading' | 'failed'
}

const initialState: StBucketState = {
    loading: true,
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
            state.bucketList = action.payload as any;
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
