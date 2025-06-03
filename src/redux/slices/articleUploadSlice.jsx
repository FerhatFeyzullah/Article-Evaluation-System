import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://localhost:7247/api/'

const initialState = {
    tracingKey: "",
    loading: false,
    successAlert: false,
    rejectedAlert: false
}

export const UploadArticle = createAsyncThunk('UploadArticle', async (data) => {
    const response = await axios.post(`${BASE_URL}articles/upload`, data);
    return response.data;
})

export const articleUploadSlice = createSlice({
    name: 'articleUpload',
    initialState,
    reducers: {
        succesAlertChange: (state) => {
            state.successAlert = !state.successAlert;
            state.tracingKey = "";
        },
        rejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(UploadArticle.pending, (state) => {
            state.loading = true;
        }),

            builder.addCase(UploadArticle.fulfilled, (state, action) => {
                state.tracingKey = action.payload;
                state.loading = false;
                state.successAlert = true;
            }),
            builder.addCase(UploadArticle.rejected, (state) => {
                state.rejectedAlert = true;
                state.loading = false;

            })
    }
})

export const { succesAlertChange, rejectedAlertChange } = articleUploadSlice.actions

export default articleUploadSlice.reducer