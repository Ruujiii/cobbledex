import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    userType: string | null;    
};

const initialState: UserState = {
    uid: null,
    displayName: null,
    email: null,
    userType: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.userType = action.payload.userType;
        },
        clearUser: (state) => {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.userType = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


