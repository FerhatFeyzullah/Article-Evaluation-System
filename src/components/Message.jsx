import React from 'react';
import '../css/Message.css';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { changeMessage, ReadMessage, setSelectedMessage } from '../redux/slices/messageSlice';
import MessageDialog from './MessageDialog';

function Message({ message }) {
    const dispatch = useDispatch();
    const { subject, email, read, messageId } = message;

    const readMessage = () => {
        // 1. önce ilgili mesajı selectedMessage yap
        dispatch(setSelectedMessage(message));

        // 2. okundu olarak işaretle (istersen önce veya sonra yapabilirsin)
        dispatch(ReadMessage(messageId));

        // 3. dialog aç
        dispatch(changeMessage());
    };

    return (
        <div
            className="m-flex-row"
            style={{
                border: read ? '5px solid lightgrey' : '5px solid rgb(212, 95, 95)',
            }}
        >
            <div className="m-div">
                <div className="m-info">Gönderen: {email}</div>
                <div className="m-info">Konu: {subject}</div>
            </div>
            <div style={{ marginRight: '10px' }}>
                <Button variant="outlined" onClick={readMessage}>
                    Oku
                </Button>
            </div>

            {/* Dialog'u her zaman render et, sadece state'e göre open olur */}
            <MessageDialog />
        </div>
    );
}

export default Message;
