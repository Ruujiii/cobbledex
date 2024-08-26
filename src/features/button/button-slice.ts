import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ButtonState {
    color: string;
};

// Define the initial state using that type
const initialState: ButtonState = {
    color: "blue",
};

// Define the slice using createSlice
export const buttonSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        setColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
    },
});

// export actions and reducer
export const { setColor } = buttonSlice.actions;
export default buttonSlice.reducer;