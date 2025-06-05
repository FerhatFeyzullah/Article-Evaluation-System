import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'


const initialState = {
    article: {},
    loading: false,
    rejectedAlert: false,
    tableOpen: false
}

export const GetArticleInquiry = createAsyncThunk('ArticleInquiry', async (data) => {
    var response = await axios.get('articles/GetArticleByIdAndWriter', {
        params: {
            fileName: data.fileName,
            email: data.email
        }
    });
    return response.data;
})

export const articleStatusInquirySlice = createSlice({
    name: 'articleStatusInquiry',
    initialState,
    reducers: {
        InquiryRejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;

        }
    },
    extraReducers: (builder) => {

        builder.addCase(GetArticleInquiry.pending, (state) => {
            state.loading = !state.loading;
        }),

            builder.addCase(GetArticleInquiry.fulfilled, (state, action) => {
                state.article = action.payload;
                state.loading = !state.loading;
                state.tableOpen = !state.tableOpen;
            }),
            builder.addCase(GetArticleInquiry.rejected, (state) => {
                state.loading = !state.loading;
                state.rejectedAlert = !state.rejectedAlert;
            })
    }

})

export const { InquiryRejectedAlertChange } = articleStatusInquirySlice.actions

export default articleStatusInquirySlice.reducer