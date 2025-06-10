import * as yup from 'yup';

export const schema = yup.object().shape({

    firstName: yup.string()
        .required('İsim giriniz.'),

    lastName: yup.string()
        .required('Soyisim giriniz.'),

    userName: yup.string()
        .required('Kullanıcı Adı giriniz.'),

    email: yup.string()
        .email("Geçerli email adresi giriniz")
        .required("Email adresi zorunlu")
        .matches(/[a-z]/, "Küçük harf içermeli"),

    password: yup.string()
        .required("Şifre alanı zorunlu")
        .min(8, "En az 8 karakter")
        .matches(/[a-z]/, "Küçük harf içermeli")
        .matches(/[A-Z]/, "Büyük harf içermeli")
        .matches(/[0-9]/, "Rakam içermeli")
        .matches(/[@$!%*?&]/, "Özel karakter içermeli"),

    confirmPass: yup.string()
        .required("Şifre tekrarı zorunlu")
        .oneOf([yup.ref('password', yup.password)], "Şifreler eşleşmiyor"),

    term: yup
        .boolean()
        .oneOf([true], "Lütfen kutucuğu onaylayınız")


})