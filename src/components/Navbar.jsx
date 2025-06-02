import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Navbar() {


    return (
        <div >
            <AppBar position="static" sx={{ backgroundColor: 'rgb(39, 88, 88)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Makale Değerlendirme Sistemi
                    </Typography>
                    <Button variant='contained' sx={{ marginRight: '15px', backgroundColor: 'rgb(34, 83, 53)' }}>Giriş Yap</Button>
                    <Button variant='contained' sx={{ backgroundColor: 'rgb(32, 49, 94)' }}>Kaydol</Button>


                </Toolbar>
            </AppBar>
        </div>


    )
}

export default Navbar