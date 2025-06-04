import * as yup from 'yup';

export const schema = yup.object().shape({

    email: yup.string()
        .email("Geçerli email adresi giriniz")
        .required("Email adresi zorunlu"),

    password: yup.string()
        .required("Şifre alanı zorunlu"),

})