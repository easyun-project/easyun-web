import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApiV1StorageVolumeList, getApiV1StorageVolume } from '@/api-client';

//获取指定数据中心的 Volume 列表
export const listAllVolume = createAsyncThunk(
    'stvoluem/listAllVolume',
    async ({ dc }: { dc: string }) => {
        const { data } = await getApiV1StorageVolumeList();
        return data?.detail;
    }
);

export const getVolumeList = createAsyncThunk(
    'storage/getVolumeList',
    async ({ dc }: { dc: string }) => {
        const { data } = await getApiV1StorageVolume();
        return data?.detail;
    }
);

export interface StVolumeState {
    loading: boolean,
    volumeList: any[],
    currentVolume: any | 'loading' | 'failed'
}

const initialState: StVolumeState = {
    loading: true,
    volumeList: [],
    currentVolume: 'loading',
};


export const stvolumeSlice = createSlice({
    name: 'stvolume',
    initialState,
    reducers: {
        // 将storage直接置为传过来的值
        updateStorage: (state, action) => {
            state.volumeList = action.payload;
        },
        updateVolumeList: (state, action) => {
            state.volumeList = action.payload;
        },

        // 删除指定name的值
        deleteVolume: (state, action) =>{
            for (let i = 0, len = state.volumeList.length; i < len; i++) {
                // 由于state使用了Proxy，所以不能直接获取到真实的值，需要把值转化出来
                const newVolumeList = JSON.parse(JSON.stringify(state.volumeList));
                console.log(i, newVolumeList, newVolumeList[i]);
                // 遍历数组中的每一项，碰到需要删除的就删掉，然后结束循环。
                if (newVolumeList[i]['Name'] === action.payload){
                    newVolumeList.splice(i, 1);
                    state.volumeList = newVolumeList;
                    break;
                }
            }
        }
    },
    extraReducers: (builder) => {

        builder.addCase(listAllVolume.fulfilled, (state: StVolumeState, action) => {
            state.loading = false;
            state.volumeList = action.payload as any;
        });
        builder.addCase(listAllVolume.pending, (state: StVolumeState) => {
            state.loading = true;
        });
        builder.addCase(listAllVolume.rejected, (state: StVolumeState) => {
            state.loading = false;
        });
    }
});
export const { updateStorage, deleteVolume, updateVolumeList } = stvolumeSlice.actions;
export default stvolumeSlice.reducer;
