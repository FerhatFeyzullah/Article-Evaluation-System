import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://localhost:7247/api/'

const initialState = {
    token: "",
    loading: false,
    rejectedAlert: false,

}

export const LoginPost = createAsyncThunk('login', async (data) => {
    var response = await axios.post(`${BASE_URL}registers/login`, data, {
        withCredentials: true
    })
    return response.data.token;
})

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginPost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(LoginPost.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
            }),
            builder.addCase(LoginPost.rejected, (state) => {
                state.loading = false;
                state.rejectedAlert = true;
            })

    }

})

export const { loginRejectedAlertChange } = loginSlice.actions

export default loginSlice.reducer