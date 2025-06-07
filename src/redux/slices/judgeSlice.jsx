import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'


const initialState = {
    articles: [],
    selectedArticle: {},
    judgeId: 0
}

export const GetArticlesForJudge = createAsyncThunk("judgesArticles", async (judgeId) => {
    var response = await axios.get(`articles/GetArticleByJudgeId/${judgeId}`)
    return response.data;

})


export const judgeSlice = createSlice({
    name: 'judge',
    initialState,
    reducers: {
        setSelectedArticle: (state, action) => {
            state.selectedArticle = action.payload;
        },
        setJudgeId: (state, action) => {
            state.judgeId = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(GetArticlesForJudge.fulfilled, (state, action) => {
            state.articles = action.payload;
        })
    }

})


export const { setSelectedArticle, setJudgeId } = judgeSlice.actions

export default judgeSlice.reducer