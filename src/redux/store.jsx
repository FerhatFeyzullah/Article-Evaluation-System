import { configureStore } from '@reduxjs/toolkit'
import articleUploadReducer from './slices/articleUploadSlice'

export const store = configureStore({
    reducer: {
        articleUpload: articleUploadReducer,
    },
})