import {createSlice} from '@reduxjs/toolkit';
import {UserModel} from "@/constant/result";

const updateUser = 'user/updateUser';


export const userAction = (user: UserModel): { payload: UserModel; type: string } => {
    return {
        type: updateUser,
        payload: user,
    };
};

const initUser: UserModel | undefined = undefined

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: initUser
    },
    reducers: {
        updateUser(state, action) {
            state.user = action.payload;
            console.log(state.user)
        }
    },
});
export default userSlice.reducer;
