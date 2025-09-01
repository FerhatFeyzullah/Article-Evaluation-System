import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import axiosInstance from '../api/axios';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutPost } from '../redux/slices/logoutSlice';
import { logoutDeleteToken } from '../redux/slices/loginSlice'
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import Badge from '@mui/material/Badge';
import { BsClipboardDataFill } from "react-icons/bs";
import { changeDrawer, GetUnreadMessageCount } from '../redux/slices/messageSlice';
import { changeLogDrawer, GetAllLogs } from '../redux/slices/logSlice';


function Navbar() {


    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { unreadCount, messageOpen } = useSelector(store => store.message)
    const { logDrawerOpen } = useSelector(store => store.message)
    const { token } = useSelector(store => store.login);

    useEffect(() => {
        if (isOnAdminPage) {
            dispatch(GetUnreadMessageCount());
        }

    }, [messageOpen, token])

    useEffect(() => {
        if (isOnAdminPage) {
            dispatch(GetAllLogs());
        }

    }, [logDrawerOpen])

    const LogoutFromSystem = async () => {
        await dispatch(LogoutPost());
        toast.success("Çıkış İşlemi Başarılı");
        localStorage.removeItem("token");
        //axiosInstance.defaults.headers.common['Authorization'] = '';
        dispatch(logoutDeleteToken());
        //document.cookie = '';
        navigate('/makalesistemi');

    }


    const isOnUploadArticlePage = location.pathname == '/makaledurumsorgulama' || location.pathname == '/girisyap'
        ||
        location.pathname == '/kaydol' || location.pathname == '/iletisim';

    const isOnInquiryPage = location.pathname == '/makalesistemi';
    const isOnRegisterPage = location.pathname == '/makalesistemi' || location.pathname == '/makaledurumsorgulama';
    const isOnLoginPage = location.pathname == '/makalesistemi' || location.pathname == '/makaledurumsorgulama';
    const isOnAdminOrJudgePage = location.pathname == '/yonetici' || location.pathname.startsWith('/degerlendirici');
    const isOnAdminPage = location.pathname == '/yonetici';
    const isNotContactPage = location.pathname == '/makaledurumsorgulama' || location.pathname == '/girisyap'
        ||
        location.pathname == '/kaydol' || location.pathname == '/makalesistemi';


    return (
        <div >
            <AppBar position="static" sx={{ backgroundColor: 'rgba(60, 82, 82, 0.73)' }}>
                <div className='navbar-main'>
                    <div style={{ width: "500px" }}>

                        <h2 className='navbar-h2'
                            onClick={() => navigate('/makalesistemi')}
                        >Makale Değerlendirme Sistemi</h2>
                    </div>

                    <div className='navbar-buttons'>
                        <div>
                            {
                                isOnInquiryPage
                                &&
                                <Button variant='contained' sx={{ backgroundColor: 'rgb(207, 192, 58)', textTransform: 'none' }}
                                    onClick={() => navigate('/makaledurumsorgulama')}
                                >Makale Durum Takibi
                                </Button>
                            }
                            {
                                isOnUploadArticlePage
                                &&
                                <Button variant='contained' sx={{ backgroundColor: 'rgb(207, 192, 58)', textTransform: 'none' }}
                                    onClick={() => navigate('/makalesistemi')}
                                >Makale Yükleme
                                </Button>
                            }

                        </div>
                        <div>

                        </div>
                        <div>
                            {
                                (isNotContactPage)
                                &&
                                <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(71, 74, 76)', textTransform: 'none' }}
                                    onClick={() => navigate('/iletisim')} >
                                    İletişim
                                </Button>

                            }

                            {
                                isOnLoginPage
                                &&
                                <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(34, 83, 53)', textTransform: 'none' }}
                                    onClick={() => navigate('/girisyap')} >
                                    Giriş Yap
                                </Button>
                            }

                            {
                                isOnRegisterPage
                                &&
                                <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(20, 45, 116)', textTransform: 'none' }}
                                    onClick={() => navigate('/kaydol')} >
                                    Kaydol
                                </Button>
                            }

                            {
                                isOnAdminPage
                                &&
                                <IconButton onClick={() => dispatch(changeLogDrawer())} sx={{ marginBottom: '5px', marginRight: '15px' }}>
                                    <BsClipboardDataFill style={{ fontSize: '28px' }} />
                                </IconButton>
                            }

                            {isOnAdminPage
                                &&

                                <IconButton onClick={() => dispatch(changeDrawer())}>
                                    <Badge badgeContent={unreadCount} color='primary'>
                                        <EmailIcon sx={{ fontSize: '30px' }} />
                                    </Badge>

                                </IconButton>
                            }

                            {
                                isOnAdminOrJudgePage
                                &&
                                <Button variant='contained' sx={{ marginLeft: '20px', marginRight: '15px', backgroundColor: 'rgb(20, 45, 116)', textTransform: 'none' }}
                                    onClick={LogoutFromSystem} >
                                    Çıkış Yap
                                </Button>
                            }








                        </div>
                    </div>




                </div>
            </AppBar>
        </div>


    )
}

export default Navbar