import * as Yup from 'yup'
export const schema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
    subject: Yup.string().required('Konu zorunlu').matches(/^[a-zA-Z]+$/, "Sadece harf"),
    content: Yup.string().required('İçerik zorunlu'),
})