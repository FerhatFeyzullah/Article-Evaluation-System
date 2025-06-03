import * as Yup from 'yup'
export const schema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
    title: Yup.string().min(3, 'Başlık çok kısa').required('Başlık zorunlu'),
})