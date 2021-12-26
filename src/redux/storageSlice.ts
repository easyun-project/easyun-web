import { createSlice } from '@reduxjs/toolkit';
import { StorageCardInfo } from '@/components/Logic/CStorageCard';

export interface StorageState {
    storageList: StorageCardInfo[],
}

const initialState: StorageState = {
    storageList: []
};

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        // 将storage直接置为传过来的值
        updateStorage: (state,action) => {
            state.storageList = action.payload;
        },
        // 删除制定name的值
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
});
export const { updateStorage, deleteStorage } = storageSlice.actions;
export default storageSlice.reducer;
