import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogoutPost } from '../redux/slices/logoutSlice';


function Navbar() {


    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const LogoutFromSystem = () => {
        dispatch(LogoutPost());
        navigate('/makalesistemi')
    }

    const isOnUploadArticlePage = location.pathname == '/makaledurumsorgulama';
    const isOnInquiryPage = location.pathname == '/makalesistemi';
    const isOnRegisterPage = location.pathname == '/makalesistemi' || location.pathname == '/makaledurumsorgulama';
    const isOnLoginPage = location.pathname == '/makalesistemi' || location.pathname == '/makaledurumsorgulama';
    const isOnAdminOrJudgePage = location.pathname == '/yonetici' || location.pathname == '/degerlendirici';

    return (
        <div >
            <AppBar position="static" sx={{ backgroundColor: 'rgb(39, 88, 88)' }}>
                <div className='navbar-main'>
                    <div style={{ width: "500px" }}>

                        <h2>Makale Değerlendirme Sistemi</h2>
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
                                isOnAdminOrJudgePage
                                &&
                                <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(20, 45, 116)', textTransform: 'none' }}
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