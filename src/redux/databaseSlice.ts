import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import databaseService, { GetDbDetailParams }from '@/service/databaseService';
import DatabaseService, { DcNameQueryParm } from '@/service/databaseService';
import { DbiModel, DbiDetail } from '@/constant/database';


//获取指定数据中心的Database列表
export const listAllDatabase = createAsyncThunk(
    'storage/listAllDatabase',
    async (params: DcNameQueryParm) => {
        return await DatabaseService.listAll(params);
    }
);

export interface DatabaseState {
    loading: boolean,
    dbInstanceList: DbiModel[],
    dbClusterList: DbiModel[],
    currentDbInstance: DbiDetail | undefined
}

const initialState: DatabaseState = {
    loading: true,
    dbInstanceList: [],
    dbClusterList: [],
    currentDbInstance: undefined
};


export const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        // 将database直接置为传过来的值
        updateDbiList: (state, action) => {
            state.dbInstanceList = action.payload;
        },

        // 删除指定name的值
        deleteDbInstance: (state, action) => {
            for (let i = state.dbInstanceList.length; i > 0; i--) {
                // 由于state使用了Proxy，所以不能直接获取到真实的值，需要把值转化出来
                const newDbInstanceList = JSON.parse(JSON.stringify(state.dbInstanceList));
                console.log(i, newDbInstanceList, newDbInstanceList[i]);
                // 遍历数组中的每一项，碰到需要删除的就删掉，然后结束循环。
                if (newDbInstanceList[i]['Name'] === action.payload) {
                    newDbInstanceList.splice(i, 1);
                    state.dbInstanceList = newDbInstanceList;
                    break;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listAllDatabase.fulfilled, (state: DatabaseState, action) => {
            state.loading = false;
            state.dbInstanceList = action.payload;
        });
        builder.addCase(listAllDatabase.pending, (state: DatabaseState) => {
            state.loading = true;
        });
        builder.addCase(listAllDatabase.rejected, (state: DatabaseState) => {
            state.loading = false;
        });

    }
});
export const { updateDbiList, deleteDbInstance } = databaseSlice.actions;
export default databaseSlice.reducer;
