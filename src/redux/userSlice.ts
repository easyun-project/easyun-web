import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '@/constant/user';



export const userAction = (user: UserModel): { payload: UserModel; type: string } => {
    return {
        type: 'user/updateUser',
        payload: user,
    };
};

export interface UserState {
    loading: boolean,
    currentUser: {
        username: string | undefined,
        accountId: string | undefined,
        accountType: string | undefined,
        token: string | undefined,
        role: string | undefined,
        deployRegion: string | undefined,
        loginTime: number | undefined,
    }
}

// const initUser: UserModel | undefined = undefined;
const initialState: UserState = {
    loading: false,
    currentUser: {
        username: undefined,
        accountId: undefined,
        accountType: undefined,
        token: undefined,
        role: undefined,
        deployRegion: undefined,
        loginTime: undefined,
    }
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action) {
            state.currentUser = action.payload;
        }
    },
});
export default userSlice.reducer;
