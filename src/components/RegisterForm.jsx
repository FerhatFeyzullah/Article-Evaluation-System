import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import '../css/Register.css'
import { useNavigate } from 'react-router-dom';
import { schema } from '../schemas/RegisterSchema'
import { useDispatch, useSelector } from 'react-redux';
import { RegisterPost } from '../redux/slices/registerSlice';
import { dialogOpen, toggleTerm } from '../redux/slices/dialogSlice';

function Register() {

    const [value, setValue] = useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { term } = useSelector(store => store.dialog)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfrimPass] = useState('');
    const [errors, setErrors] = useState({})

    const formClear = () => {
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setConfrimPass('');
        dispatch(toggleTerm());

    }


    const submit = async () => {

        try {
            await schema.validate({ firstName, lastName, userName, email, password, confirmPass, term }, { abortEarly: false })
            setErrors({})

            const registerData = {
                FirstName: firstName,
                LastName: lastName,
                UserName: userName,
                Email: email,
                Password: password,
                ConfirmPassword: confirmPass
            }
            dispatch(RegisterPost(registerData));
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
                                <Tab value={0} label="Giriş Yap" onClick={() => navigate('/girisyap')} />
                                <Tab value={1} label="Kaydol" onClick={() => navigate('/kaydol')} />
                            </Tabs>
                        </div>
                    </div>
                    <div className='register-inputs'>
                        <div className='register-input'>
                            {
                                errors.firstName ?
                                    <TextField error variant='standard' size='small' label="İsim" helperText={errors.firstName}
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
                                    :
                                    <TextField label='İsim' variant='standard' size='small'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        fullWidth
                                    />
                            }
                        </div>
                        <div className='register-input'>
                            {
                                errors.lastName ?
                                    <TextField error variant='standard' size='small' label="Soyisim" helperText={errors.lastName}
                                        value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
                                    :
                                    <TextField label='Soyisim' variant='standard' size='small'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        fullWidth
                                    />
                            }
                        </div>
                        <div className='register-input'>
                            {
                                errors.userName ?
                                    <TextField error variant='standard' size='small' label="Kullanıcı Adı" helperText={errors.userName}
                                        value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth />
                                    :
                                    <TextField label='Kullanıcı Adı' variant='standard' size='small'
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        fullWidth
                                    />
                            }
                        </div>
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
                        <div className='register-input'>
                            {
                                errors.confirmPass ?
                                    <TextField error variant='standard' size='small' label="Şifre Tekrarı" helperText={errors.confirmPass}
                                        value={confirmPass} onChange={(e) => setConfrimPass(e.target.value)} fullWidth />
                                    :
                                    <TextField label='Şifre Tekrarı' variant='standard' size='small'
                                        value={confirmPass}
                                        onChange={(e) => setConfrimPass(e.target.value)}
                                        fullWidth
                                    />
                            }
                        </div>

                    </div>
                    <div className='register-checkbox'>
                        <div style={{}}>
                            <Checkbox checked={term} onChange={() => dispatch(toggleTerm())} />

                        </div>
                        <div>
                            <a
                                onClick={() => dispatch(dialogOpen())}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}
                            >
                                Hakemlik kurallarını kabul ediyorum.
                            </a>
                        </div>

                    </div>
                    {
                        errors.term && <span style={{ color: 'red' }}>{errors.term}</span>
                    }


                    <div style={{ marginTop: '20px' }}>
                        <Button variant='contained' sx={{ backgroundColor: 'rgb(20, 45, 116)' }} fullWidth size='large' onClick={submit}>
                            Kaydol
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register