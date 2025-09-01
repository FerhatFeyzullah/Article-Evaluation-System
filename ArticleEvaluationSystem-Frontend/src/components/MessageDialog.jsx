import React from 'react';
import '../css/Message.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeMessage } from '../redux/slices/messageSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function MessageDialog() {
    const dispatch = useDispatch();
    const { messageOpen, selectedMessage } = useSelector((store) => store.message);


    //const { subject = '', email = '', content = '' } = selectedMessage || {};
    const { subject, email, content } = selectedMessage;

    return (
        <BootstrapDialog
            onClose={() => dispatch(changeMessage())}
            aria-labelledby="customized-dialog-title"
            open={messageOpen}
            BackdropProps={{
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Mesaj İçeriği
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => dispatch(changeMessage())}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{ width: '500px' }}>
                <Typography gutterBottom>Gönderen Email: {email}</Typography>
                <br />
                <Typography gutterBottom>Konu: {subject}</Typography>
                <br />
                <Typography gutterBottom sx={{ minHeight: '100px' }}>
                    İçerik: {content}
                </Typography>
                <br />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(changeMessage())}>Kapat</Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default MessageDialog;
