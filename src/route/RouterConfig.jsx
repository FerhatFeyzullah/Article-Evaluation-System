import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import ArticleStatusInquiry from '../pages/ArticleStatusInquiry'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import Judge from '../pages/Judge'
import ArticleDetails from '../pages/ArticleDetails'
import ArticleReview from '../pages/ArticleReview'
import Contact from '../pages/Contact'
import PrivateRoute from './PrivateRoute'
import AccessDenied from '../pages/AccessDenied'
import NotFound from '../pages/NotFound'



function RouterConfig() {



    return (
        <Routes>
            <Route path="/" element={<Navigate to="/makalesistemi" replace />} />
            <Route path='/makalesistemi' element={<Home />} />

            <Route path='/makaledurumsorgulama' element={<ArticleStatusInquiry />} />

            <Route path='/kaydol' element={<Register />} />
            <Route path='/girisyap' element={<Login />} />

            <Route path='/yonetici' element={
                <PrivateRoute allowedRoles={['Admin']}>
                    <Admin />
                </PrivateRoute>
            } />

            <Route path='/degerlendirici/:judgeId' element={
                <PrivateRoute allowedRoles={['Judge']}>
                    <Judge />
                </PrivateRoute>
            } />

            <Route path='/makale-detay/:articleId' element={
                <PrivateRoute allowedRoles={['Admin']}>
                    <ArticleDetails />
                </PrivateRoute>
            } />

            <Route path='/makale-degerlendirme/:articleId' element={
                <PrivateRoute allowedRoles={['Judge']}>
                    <ArticleReview />
                </PrivateRoute>
            } />

            <Route path='/iletisim' element={<Contact />} />
            <Route path='/yetkisiz-erisim' element={<AccessDenied />} />
            <Route path='*' element={<NotFound />} />

        </Routes>
    )
}

export default RouterConfig