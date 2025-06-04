import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://localhost:7247/api/'

const initialState = {
    articles: [],
    judges: [],
    loading: false,
    rejectedAlert: false,

}

export const GetAllArticles = createAsyncThunk('articles', async () => {
    var response = await axios.get(`${BASE_URL}articles/GetAllArticles`)
    return response.data;
})

export const GetAllJudges = createAsyncThunk('judges', async () => {
    var response = await axios.get(`${BASE_URL}users/GetAllJudges`, {
        withCredentials: true
    })
    return response.data;
})



export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminRejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(GetAllArticles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload;
        });
        builder.addCase(GetAllArticles.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(GetAllJudges.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetAllJudges.fulfilled, (state, action) => {
            state.loading = false;
            state.judges = action.payload;
        });
        builder.addCase(GetAllJudges.rejected, (state) => {
            state.loading = false;
        });
    }

})

export const { } = adminSlice.actions

export default adminSlice.reducer