import React from 'react'
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm'
import { registerRejectedAlertChange } from '../redux/slices/registerSlice';
import Loading from '../components/Loading';
import RejectedAlert from '../components/Alerts/RejectedAlert'
import { useDispatch, useSelector } from 'react-redux';
import MyDialog from '../components/MyDialog'
import { dialogClose, termOk } from '../redux/slices/dialogSlice';
import RegisterSuccessAlert from '../components/Alerts/RegisterSuccessAlert';

function Register() {

    const dispatch = useDispatch();

    const { loading, rejectedAlert } = useSelector(Store => Store.register)
    const { dialog } = useSelector(store => store.dialog)

    const Change = () => {
        dispatch(registerRejectedAlertChange())
    }
    const closeDialog = () => {
        dispatch(dialogClose())
    }
    const closeDialogAndTermChange = () => {
        dispatch(dialogClose())
        dispatch(termOk())
    }
    return (

        <div className='register-main-div'>
            <Navbar />
            <div className='alert-div'>
                <RegisterSuccessAlert />
                <RejectedAlert rejectedAlert={rejectedAlert} change={Change} />
            </div>
            <RegisterForm />

            <Loading loading={loading} />
            <MyDialog dialog={dialog} closeDialog={closeDialog} termOk={closeDialogAndTermChange} />
        </div>


    )
}

export default Register