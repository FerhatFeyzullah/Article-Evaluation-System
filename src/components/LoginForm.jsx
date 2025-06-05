import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';
import { schema } from '../schemas/LoginSchema'
import { useDispatch, useSelector } from 'react-redux';
import { LoginPost } from '../redux/slices/loginSlice';
import { jwtDecode } from "jwt-decode";


function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(Store => Store.login)

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                console.log(role)

                if (role === "Admin") {
                    navigate('/yonetici');
                }

                else if (role === "Judge") {
                    navigate("/degerlendirici");
                }

                else {
                    console.warn("Bilinmeyen rol:", role);
                }

            }

            catch (error) {
                console.log(token)
                console.error("Token çözümlenemedi:", error);
            }
        }
    }, [token, navigate])

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})

    const formClear = () => {

        setEmail('');
        setPassword('');
    }



    const submit = async () => {

        try {
            await schema.validate({ email, password }, { abortEarly: false })
            setErrors({})

            const loginData = {

                Email: email,
                Password: password

            }
            dispatch(LoginPost(loginData));
            formClear();

        }
        catch (error) {
            const errObj = {}
            error.inner.forEach((e) => {
                errObj[e.path] = e.message
            })
            setErrors(errObj)
        }

    }


    return (
        <div>
            <div className='register-main'>
                <div className='register-card'>
                    <div className='register-buttons-div'>
                        <div>
                            <Tabs value={value} onChange={handleChange} >
                                <Tab value={0} label="GİRİŞ YAP" onClick={() => navigate('/girisyap')} sx={{ textTransform: 'none' }} />
                                <Tab value={1} label="KAYDOL" onClick={() => navigate('/kaydol')} sx={{ textTransform: 'none' }} />
                            </Tabs>
                        </div>
                    </div>
                    <div className='register-inputs'>
                        <div className='register-input'>
                            {
                                errors.email ?
                                    <TextField error variant='standard' size='small' label="Email" helperText={errors.email}
                                        value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                                    :
                                    <TextField label='Email' variant='standard' size='small'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                    />
                            }
                        </div>
                        <div className='register-input'>
                            {
                                errors.password ?
                                    <TextField error variant='standard' size='small' label="Şifre" helperText={errors.password}
                                        value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
                                    :
                                    <TextField label='Şifre' variant='standard' size='small'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                    />
                            }
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant='contained' sx={{ backgroundColor: 'rgb(55, 124, 49)', textTransform: 'none' }} fullWidth size='large' onClick={submit}>
                            Giriş Yap
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm