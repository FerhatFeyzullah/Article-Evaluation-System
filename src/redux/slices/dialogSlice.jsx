import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://localhost:7247/api/'

const initialState = {
    dialog: false,
    term: false

}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        dialogOpen: (state) => {
            state.dialog = true;
        },
        dialogClose: (state) => {
            state.dialog = false;
        },
        termOk: (state) => {
            state.term = true;
        },
        toggleTerm: (state) => {
            state.term = !state.term;
        }
    }
})

export const { dialogOpen, dialogClose, termOk, toggleTerm } = dialogSlice.actions

export default dialogSlice.reducer

