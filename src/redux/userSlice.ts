import {createSlice} from '@reduxjs/toolkit';
import {User} from "@/constant/result";

const updateUser = 'user/updateUser';


export const userAction = (user: User): { payload: User; type: string } => {
    return {
        type: updateUser,
        payload: user,
    };
};

const initUser: User | undefined = undefined

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
