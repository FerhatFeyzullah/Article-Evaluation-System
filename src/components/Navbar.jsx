import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';


function Navbar() {


    const navigate = useNavigate();
    const location = useLocation();

    const isOnUploadArticlePage = location.pathname !== '/makalesistemi';
    const isOnInquiryPage = location.pathname !== '/makaledurumsorgulama' && location.pathname !== '/girisyap' && location.pathname !== '/kaydol';
    const isOnRegisterPage = location.pathname !== '/kaydol';
    const isOnLoginPage = location.pathname !== '/girisyap';

    return (
        <div >
            <AppBar position="static" sx={{ backgroundColor: 'rgb(39, 88, 88)' }}>
                <div className='navbar-main'>
                    <div>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Makale Değerlendirme Sistemi
                        </Typography>
                    </div>

                    <div className='navbar-buttons'>
                        <div>
                            {
                                isOnInquiryPage
                                &&
                                <Button variant='contained' sx={{ backgroundColor: 'rgb(207, 192, 58)' }}
                                    onClick={() => navigate('/makaledurumsorgulama')}
                                >Makale Durum Takibi
                                </Button>
                            }
                            {
                                isOnUploadArticlePage
                                &&
                                <Button variant='contained' sx={{ backgroundColor: 'rgb(207, 192, 58)' }}
                                    onClick={() => navigate('/makalesistemi')}
                                >Makale Yükleme
                                </Button>
                            }

                        </div>
                        <div>
                            {
                                isOnLoginPage
                                &&
                                <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(34, 83, 53)' }}
                                    onClick={() => navigate('/girisyap')} >
                                    Giriş Yap
                                </Button>
                            }

                            {
                                isOnRegisterPage
                                &&
                                <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(20, 45, 116)' }}
                                    onClick={() => navigate('/kaydol')} >
                                    Kaydol
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