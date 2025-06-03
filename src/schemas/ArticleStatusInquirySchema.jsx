import * as Yup from 'yup'
export const schema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
    tracingKey: Yup.string().min(10, 'Takip Numarası daha uzun olmalı.').required('Takip numarası zorunlu'),
})