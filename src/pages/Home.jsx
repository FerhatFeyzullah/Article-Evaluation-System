import React from 'react'
import Navbar from '../components/Navbar'
import ArticleUpload from '../components/ArticleUpload'
import Loading from '../components/Loading'
import SuccessAlert from '../components/SuccessAlert'
import RejectedAlert from '../components/RejectedAlert'
import '../css/Home.css'

function Home() {
    return (
        <div>
            <Navbar />
            <div className='succesAlert-div'>
                <SuccessAlert />
                <RejectedAlert />
            </div>

            <ArticleUpload />
            <Loading />

        </div>
    )
}

export default Home