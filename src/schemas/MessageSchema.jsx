import * as Yup from 'yup'
export const schema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
    subject: Yup.string().required('Konu zorunlu'),
    content: Yup.string().required('İçerik zorunlu'),
})