import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'

const initialState = {
    messages: [],
    unreadCount: 0,
    messageDrawerOpen: false,
    messageOpen: false,
    selectedMessage: {}
}

export const PostMessage = createAsyncThunk('messageSend', async (data) => {
    await axios.post('messages/Create', data);
})
export const GetUnreadMessageCount = createAsyncThunk('unreadCount', async () => {
    var response = await axios.get('messages/GetUnreadMessagesCount');
    return response.data;

})
export const GetAllMessages = createAsyncThunk('allMessage', async () => {
    var response = await axios.get('messages/GetAllMessages');
    return response.data;
})
export const ReadMessage = createAsyncThunk('read', async (id) => {
    await axios.put(`messages/MessageRead/${id}`);
})



export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        changeDrawer: (state) => {
            state.messageDrawerOpen = !state.messageDrawerOpen;
        },
        changeMessage: (state) => {
            state.messageOpen = !state.messageOpen;
        },
        setSelectedMessage: (state, action) => {
            state.selectedMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetUnreadMessageCount.fulfilled, (state, action) => {
            state.unreadCount = action.payload;
        }),
            builder.addCase(GetAllMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
    }

})

export const { changeDrawer, changeMessage, setSelectedMessage } = messageSlice.actions

export default messageSlice.reducer