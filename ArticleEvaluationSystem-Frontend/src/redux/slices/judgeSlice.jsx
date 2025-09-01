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

export const GetArticleByIdForJudge = createAsyncThunk('getArticleForJudge', async (articleId) => {
    var response = await axios.get(`articles/GetArticleById${articleId}`);
    return response.data;
})

export const PutArticleStatus = createAsyncThunk("articleState", async (data) => {
    await axios.put("articles/UpdateArticleStatus", null, {
        params: {
            articleId: data.artId,
            status: data.state,
            reasonForEditing: data.reason
        }
    })
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
        }),
            builder.addCase(GetArticleByIdForJudge.fulfilled, (state, action) => {
                state.selectedArticle = action.payload;
            })
    }

})


export const { setSelectedArticle, setJudgeId } = judgeSlice.actions

export default judgeSlice.reducer