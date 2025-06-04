import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function MyDialog({ dialog, closeDialog, termOk }) {

    return (
        <div>
            <BootstrapDialog
                onClose={closeDialog}
                aria-labelledby="customized-dialog-title"
                open={dialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Hakemlik Kuralları ve Sorumlulukları
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>

                        Hakemler, değerlendirdikleri makalelerde kesinlikle tarafsız olmalıdır.
                        Kişisel ilişki, ön yargı ya da çıkar çatışması bulunan durumlarda değerlendirme yapılmamalıdır.
                    </Typography>
                    <br />
                    <Typography gutterBottom>

                        Hakemlik sürecinde elde edilen tüm bilgiler gizlidir.
                        Değerlendirilen makaleler hiçbir şekilde üçüncü kişilerle paylaşılmamalıdır.
                    </Typography>
                    <br />
                    <Typography gutterBottom>

                        Hakem, yazarın gelişimine katkı sağlayacak şekilde yapıcı ve açıklayıcı yorumlar yapmalıdır.
                        Eleştiriler kişisel değil, akademik düzeyde olmalıdır.
                    </Typography>
                    <br />
                    <Typography gutterBottom>

                        Makalede intihal, veri uydurma, etik dışı yöntemler gibi durumlar tespit edilirse derhal editör bilgilendirilmelidir.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={termOk}>
                        Kabul Ediyorum
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default MyDialog
