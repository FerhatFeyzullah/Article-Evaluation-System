import React from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import Loading from '../components/Loading'
import RejectedAlert from '../components/Alerts/RejectedAlert'
import { useDispatch, useSelector } from 'react-redux'
import { loginRejectedAlertChange } from '../redux/slices/loginSlice'

function Login() {

    const { loading, rejectedAlert } = useSelector(store => store.login)

    const dispatch = useDispatch();
    const Change = () => {
        dispatch(loginRejectedAlertChange())
    }

    return (
        <div>
            <Navbar />
            <div className='alert-div'>
                <RejectedAlert rejectedAlert={rejectedAlert} change={Change} />
            </div>
            <LoginForm />
            <Loading loading={loading} />

        </div>
    )
}

export default Login