import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'

const initialState = {
    logs: [],
    logDrawerOpen: false,

}

export const GetAllLogs = createAsyncThunk('allLogs', async () => {
    var response = await axios.get('logs/GetAllLogs');
    return response.data;
})

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        changeLogDrawer: (state) => {
            state.logDrawerOpen = !state.logDrawerOpen;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(GetAllLogs.fulfilled, (state, action) => {
            state.logs = action.payload;
        })
    }

})

export const { changeLogDrawer } = logSlice.actions

export default logSlice.reducer