import { Button, TextField } from '@mui/material'
import { schema } from '../schemas/ArticleStatusInquirySchema'
import React, { useEffect, useState } from 'react'
import '../css/ArticleInquiry.css'
import { useDispatch, useSelector } from 'react-redux';
import { GetArticleInquiry } from '../redux/slices/articleStatusInquirySlice';

function ArticleInquiry() {
    const [tracingKey, setTracingKey] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const { article } = useSelector(store => store.articleInquiry)

    const formClear = () => {
        setTracingKey('');
        setEmail('');
    }


    const handleSubmit = async () => {
        try {
            await schema.validate({ email, tracingKey }, { abortEarly: false })
            setErrors({})


            const inquiryData = {
                fileName: tracingKey,
                email: email
            }

            dispatch(GetArticleInquiry(inquiryData));
            formClear();

        } catch (err) {
            const errObj = {}
            err.inner.forEach((e) => {
                errObj[e.path] = e.message
            })
            setErrors(errObj)
        }



    }
    return (

        <div style={{ marginTop: '50px' }}>
            <div className='inquiry-main'>
                <div className='inquiry-input' style={{ width: '400px' }}>
                    {
                        errors.tracingKey ?
                            <TextField
                                error
                                size='small'
                                label="Takip Numarası"
                                value={tracingKey}
                                onChange={(e) => setTracingKey(e.target.value)}
                                helperText={errors.tracingKey}
                                fullWidth
                            />
                            :
                            <TextField label='Takip Numarası' variant='outlined' size='small'
                                fullWidth
                                value={tracingKey}
                                onChange={(e) => setTracingKey(e.target.value)}
                            />
                    }
                </div>
                <div className='inquiry-input'>
                    {
                        errors.email ?
                            <TextField
                                error
                                size='small'
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                helperText={errors.email}
                            />
                            :
                            <TextField label='Email' variant='outlined' size='small'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                    }


                </div>
                <div>
                    <Button variant='contained' onClick={handleSubmit} sx={{ textTransform: 'none' }}>
                        Sorgula
                    </Button>
                </div>
            </div>
        </div>

    )

}

export default ArticleInquiry