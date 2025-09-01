import React from 'react'
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccessAlertChange } from '../../redux/slices/registerSlice';

function RegisterSuccessAlert() {

    const dispatch = useDispatch();
    const { successAlert } = useSelector(store => store.register);

    return (
        <div>
            {
                successAlert &&
                <Alert severity="success" sx={{ alignItems: 'center' }}

                    action={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => dispatch(registerSuccessAlertChange())}>
                                <ClearIcon />
                            </IconButton>
                        </div>

                    }
                >
                    Kaydınız başarıyla gerçekleştirildi.
                </Alert>
            }

        </div>
    )
}

export default RegisterSuccessAlert