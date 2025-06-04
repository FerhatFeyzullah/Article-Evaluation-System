import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


function RejectedAlert({ rejectedAlert, change }) {




    return (
        <div>{rejectedAlert && <Alert
            severity="error"
            sx={{ alignItems: 'center' }}
            action={
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <IconButton onClick={change}>
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