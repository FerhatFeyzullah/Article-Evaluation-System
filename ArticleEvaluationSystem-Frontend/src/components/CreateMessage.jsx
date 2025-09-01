import '../css/Message.css'
import { useState } from 'react'
import { Button, TextField, IconButton } from '@mui/material'
import { schema } from '../schemas/MessageSchema'
import { useDispatch } from 'react-redux'
import React from 'react'
import SendIcon from '@mui/icons-material/Send'
import { PostMessage } from '../redux/slices/messageSlice'
import { toast } from 'react-toastify'

function CreateMessage() {

    const [content, setContent] = useState('')
    const [subject, setSubject] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    const formClear = () => {
        setContent('');
        setSubject('');
        setEmail('');
    }

    const handleSubmit = async () => {

        try {
            await schema.validate({ email, subject, content }, { abortEarly: false })
            setErrors({})

            const data = {
                Email: email,
                Subject: subject,
                Content: content
            }
            dispatch(PostMessage(data));
            toast.success("Mesaj Gönderildi.")
            formClear();

        } catch (err) {
            const errObj = {};

            // Kontrol ekle, inner varsa forEach yap
            if (err.inner && Array.isArray(err.inner)) {
                err.inner.forEach((e) => {
                    errObj[e.path] = e.message;
                });
            } else if (err.path && err.message) {
                // inner yoksa tek hatayı koy
                errObj[err.path] = err.message;
            }

            setErrors(errObj);
        }
    }

    return (
        <div>
            <div className="message-create-inputs">
                <div className="message-create-div">

                    <h3 className="m-c-h3">Bizimle İletişime Geçin</h3>

                    <div style={{ width: '100%' }}>
                        {
                            errors.email ?
                                <TextField
                                    error
                                    size='small'
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    helperText={errors.email}
                                    variant='outlined'

                                />
                                :
                                <TextField label='Email' variant='outlined' size='small'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}


                                />
                        }
                    </div>
                    <br />
                    <div style={{ width: '100%' }}>
                        {
                            errors.subject ?
                                <TextField
                                    error
                                    size='small'
                                    label="Konu"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    helperText={errors.subject}
                                    variant='outlined'

                                />
                                :
                                <TextField label='Konu' variant='outlined' size='small'
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}

                                />
                        }
                    </div>
                    <br />
                    <div style={{ width: '100%' }}>
                        {
                            errors.content ?
                                <TextField
                                    error
                                    size='small'
                                    label="İçerik"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    helperText={errors.content}
                                    variant='outlined'
                                    multiline
                                    rows={5}
                                    fullWidth
                                />
                                :
                                <TextField label='İçerik' variant='outlined' size='small' rows={5} fullWidth multiline
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                        }
                    </div>

                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{ backgroundColor: 'rgb(27, 138, 36)', marginTop: '20px' }}
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Gönder
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default CreateMessage