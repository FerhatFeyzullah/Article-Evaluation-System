import { configureStore } from '@reduxjs/toolkit'
import articleUploadReducer from './slices/articleUploadSlice'
import articleStatusInquiryReducer from './slices/articleStatusInquirySlice'

export const store = configureStore({
    reducer: {
        articleUpload: articleUploadReducer,
        articleInquiry: articleStatusInquiryReducer,

    },
})