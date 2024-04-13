import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isStudent: false,
    isTeacher: false,
    isAdmin: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeIsStudent: (state, action) => {
            state.isStudent = action.payload;
        },
        changeIsTeacher: (state, action) => {
            state.isTeacher = action.payload;
        },
        changeIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
    }
})

export const { changeIsAdmin, changeIsStudent, changeIsTeacher } = userSlice.actions;

export default userSlice.reducer;