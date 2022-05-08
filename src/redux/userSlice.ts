import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '@/constant/user';

const updateUser = 'user/updateUser';


export const userAction = (user: UserModel): { payload: UserModel; type: string } => {
    return {
        type: updateUser,
        payload: user,
    };
};

// const initUser: UserModel | undefined = undefined;

const initUser = {
    username: '',
    accountId: '',
    accountType: '',
    token: '',
    role: '',
    deployRegion: '',
    loginTime:0
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        currentUser: initUser
    },
    reducers: {
        updateUser(state, action) {
            state.currentUser = action.payload;
        }
    },
});
export default userSlice.reducer;
