import {createSlice} from '@reduxjs/toolkit';
import {DataCenterModel, UserModel} from "@/constant/result";

const updateUser = 'dataCenter/all';


export const getDataCenterAction = (): { payload: {}; type: string } => {
    return {
        type: updateUser,
        payload: {},
    };
};

const dataCenter: DataCenterModel | undefined = undefined

export const dataCenterSlice = createSlice({
    name: 'dataCenter',
    initialState: {
        user: dataCenter
    },
    reducers: {
        // updateUser(state, action) {
        //     state.user = action.payload;
        //     console.log(state.user)
        // }
    },
});
export default dataCenterSlice.reducer;
