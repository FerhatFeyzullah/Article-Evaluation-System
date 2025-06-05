import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import ArticleStatusInquiry from '../pages/ArticleStatusInquiry'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import Judge from '../pages/Judge'
import ArticleDetails from '../pages/ArticleDetails'



function RouterConfig() {



    return (
        <Routes>
            <Route path="/" element={<Navigate to="/makalesistemi" replace />} />
            <Route path='/makalesistemi' element={<Home />} />

            <Route path='/makaledurumsorgulama' element={<ArticleStatusInquiry />} />

            <Route path='/kaydol' element={<Register />} />
            <Route path='/girisyap' element={<Login />} />

            <Route path='/yonetici' element={<Admin />} />
            <Route path='/degerlendirici' element={<Judge />} />

            <Route path='/makale-detay/:articleId' element={<ArticleDetails />} />

        </Routes>
    )
}

export default RouterConfig