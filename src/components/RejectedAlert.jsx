import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { rejectedAlertChange, succesAlertChange } from '../redux/slices/articleUploadSlice';

function RejectedAlert() {

    const dispatch = useDispatch();
    const { rejectedAlert } = useSelector(store => store.articleUpload);

    return (
        <div>{rejectedAlert && <Alert
            severity="error"
            sx={{ alignItems: 'center' }}
            action={
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <IconButton onClick={() => dispatch(rejectedAlertChange())}>
                        <ClearIcon />
                    </IconButton>
                </div>

            }
        >
            Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.
        </Alert>}

        </div>
    )
}

export default RejectedAlert