import React from 'react'
import Navbar from '../components/Navbar'
import ArticleUpload from '../components/ArticleUpload'
import Loading from '../components/Loading'
import SuccessAlert from '../components/Alerts/SuccessAlert'
import RejectedAlert from '../components/Alerts/RejectedAlert'
import { useDispatch, useSelector } from 'react-redux'
import { rejectedAlertChange } from '../redux/slices/articleUploadSlice'
import '../css/Home.css'

function Home() {
    const dispatch = useDispatch();

    const { loading, rejectedAlert } = useSelector(store => store.articleUpload)

    const Change = () => {
        dispatch(rejectedAlertChange())
    }

    return (
        <div className='home-main-div'>
            <Navbar />
            <div className='alert-div'>
                <SuccessAlert />
                <RejectedAlert rejectedAlert={rejectedAlert} change={Change} />
            </div>

            <ArticleUpload />
            <Loading loading={loading} />

        </div>
    )
}

export default Home