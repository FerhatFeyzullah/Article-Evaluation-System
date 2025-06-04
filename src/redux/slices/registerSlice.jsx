import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://localhost:7247/api/'

const initialState = {
    loading: false,
    successAlert: false,
    rejectedAlert: false,
}

export const RegisterPost = createAsyncThunk('register', async (data) => {
    const response = await axios.post(`${BASE_URL}registers/register`, data);
    return response.data;
})

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerSuccessAlertChange: (state) => {
            state.successAlert = !state.successAlert;
        },
        registerRejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterPost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(RegisterPost.fulfilled, (state) => {
                state.loading = false;
                state.successAlert = true;
            }),
            builder.addCase(RegisterPost.rejected, (state) => {
                state.loading = false;
                state.rejectedAlert = true;
            })
    }

})

export const { registerSuccessAlertChange, registerRejectedAlertChange } = registerSlice.actions

export default registerSlice.reducer