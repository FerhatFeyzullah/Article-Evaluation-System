import { configureStore } from '@reduxjs/toolkit'
import articleUploadReducer from './slices/articleUploadSlice'
import articleStatusInquiryReducer from './slices/articleStatusInquirySlice'
import registerReducer from './slices/registerSlice'
import dilaogReducer from './slices/dialogSlice'

export const store = configureStore({
    reducer: {
        articleUpload: articleUploadReducer,
        articleInquiry: articleStatusInquiryReducer,
        register: registerReducer,
        dialog: dilaogReducer

    },
})