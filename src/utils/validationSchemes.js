import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно состоять минимум из 2 символов')
    .required('Введите имя'),
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),
  password: Yup.string()
    .min(8, 'Пароль должен состоять минимум из 8 символов')
    .required('Введите пароль'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Введите пароль')
})

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),
  password: Yup.string()
    .required('Введите пароль')
})

export const createWorkspaceSchema = Yup.object().shape({
  name: Yup.string().required('Введите название рабочее пространства'),
  slug: Yup.string().required('Введите слаг рабочее пространства')
})
