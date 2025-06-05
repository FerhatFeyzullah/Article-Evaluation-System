import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'

const initialState = {

    loading: false,

}

export const LogoutPost = createAsyncThunk('logout', async () => {
    await axios.post('registers/logout');
})

export const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(LogoutPost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(LogoutPost.fulfilled, (state) => {
                state.loading = false;
            })


    }

})

export const { } = logoutSlice.actions

export default logoutSlice.reducer