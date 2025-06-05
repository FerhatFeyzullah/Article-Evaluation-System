import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'


const initialState = {
    articles: [],
    selectedArticle: {},
    judges: [],
    loading: false,
    rejectedAlert: false,
    assignJudgeDialog: false,
}

export const GetAllArticles = createAsyncThunk('articles', async () => {
    var response = await axios.get('articles/GetAllArticles')
    return response.data;
})

export const GetArticleById = createAsyncThunk('getArticle', async (articleId) => {
    var response = await axios.get(`articles/GetArticleById${articleId}`);
    return response.data;
})

export const GetAllJudges = createAsyncThunk('judges', async () => {
    var response = await axios.get('users/GetAllJudges')
    return response.data;
})

export const AssignJudgeToArticle = createAsyncThunk('assignJudge', async (data) => {
    await axios.put('/articles/AssignJudgeToArticle', null, {
        params: {
            articleId: data.articleId,
            judgeId: data.judgeId
        }
    })
})



export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminRejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        },

        setSelectedArticle: (state, action) => {
            state.selectedArticle = action.payload;
        },

        assignJudgeDialogChange: (state) => {
            state.assignJudgeDialog = !state.assignJudgeDialog;
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


        builder.addCase(GetArticleById.fulfilled, (state, action) => {
            state.selectedArticle = action.payload;
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

export const { setSelectedArticle, adminRejectedAlertChange, assignJudgeDialogChange } = adminSlice.actions

export default adminSlice.reducer