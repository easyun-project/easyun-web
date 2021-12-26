import { createSlice } from '@reduxjs/toolkit';
import { StorageCardInfo } from '@/components/Logic/CStorageCard';

export interface StorageState {
    storageList: StorageCardInfo[]
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
                console.log(state.storageList, i);
                // if (state.storageList.find((obj)=>{return obj.Name === action.payload;})?.Name === action.payload){
                //     console.log(action.payload,i);
                //     // 删除从索引为i开始的1个值
                //     state.storageList.splice(i,1);
                // }

            }
        }
    },
});
export const { updateStorage, deleteStorage } = storageSlice.actions;
export default storageSlice.reducer;
