import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import ArticleStatusInquiry from '../pages/ArticleStatusInquiry'


function RouterConfig() {



    return (
        <Routes>
            <Route path="/" element={<Navigate to="/makalesistemi" replace />} />
            <Route path='/makalesistemi' element={<Home />} />
            <Route path='/makaledurumsorgulama' element={<ArticleStatusInquiry />} />

        </Routes>
    )
}

export default RouterConfig