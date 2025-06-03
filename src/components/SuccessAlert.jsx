import React from 'react'
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { succesAlertChange } from '../redux/slices/articleUploadSlice';

function SuccessAlert() {

    const dispatch = useDispatch();
    const { tracingKey, successAlert } = useSelector(store => store.articleUpload);

    const { copied, copy } = useCopyToClipboard(tracingKey)

    return (
        <div>{successAlert && <Alert
            severity="success"
            sx={{ alignItems: 'center' }}
            action={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {copied ? (
                        <IconButton disabled>
                            <CheckIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={copy}>
                            <ContentCopyIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={() => dispatch(succesAlertChange())}>
                        <ClearIcon />
                    </IconButton>
                </div>

            }
        >

            Makale başarıyla yüklendi. Makale Takip Numarası: {tracingKey}

        </Alert>}

        </div>
    )
}

export default SuccessAlert