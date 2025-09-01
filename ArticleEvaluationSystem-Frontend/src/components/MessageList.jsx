import React, { useEffect } from 'react'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllMessages } from '../redux/slices/messageSlice';

function MessageList() {

    const dispatch = useDispatch();

    const { messages, messageOpen } = useSelector(store => store.message);

    useEffect(() => {
        dispatch(GetAllMessages());
    }, [messageOpen])
    return (
        <div>
            {
                messages && messages.map((message) => (
                    <Message key={message.messageId} message={message} />
                ))
            }

        </div>
    )
}

export default MessageList