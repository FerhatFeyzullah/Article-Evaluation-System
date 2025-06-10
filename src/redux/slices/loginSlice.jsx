import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'


const initialState = {
    token: localStorage.getItem("token") || null,
    loading: false,
    rejectedAlert: false,

}

export const LoginPost = createAsyncThunk('login', async (data) => {
    var response = await axios.post('registers/login', data

    )
    return response.data.token;
})

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        },
        logoutDeleteToken: (state) => {
            state.token = "";
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginPost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(LoginPost.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem("token", action.payload);
            }),
            builder.addCase(LoginPost.rejected, (state) => {
                state.loading = false;
                state.rejectedAlert = true;
            })

    }

})

export const { loginRejectedAlertChange, logoutDeleteToken } = loginSlice.actions

export default loginSlice.reducer