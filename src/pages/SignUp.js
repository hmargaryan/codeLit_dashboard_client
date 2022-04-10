import React, { useState, useEffect } from 'react'
import {
  Center,
  Box,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Mail, Lock } from 'tabler-icons-react'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { useSignUpMutation } from '../store/services/userApi'
import { signUpSchema } from '../utils/validationSchemes'
import styles from '../styles/Sign.module.css'

const SignUp = () => {
  const form = useForm({
    schema: yupResolver(signUpSchema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmedPassword: ''
    }
  })
  const [signUp, { data, isLoading }] = useSignUpMutation()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      cookie.set('user', JSON.stringify(data), { expires: 7 })
    }
  }, [data])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()
    setError(null)

    try {
      await signUp(values).unwrap()
      navigate('/create-workspace')
    } catch (error) {
      if (error?.data?.field) {
        form.setFieldError(error.data.field, error.data.message)
      } else {
        setError(error.data.message)
      }
    }
  }

  return (
    <Center className={styles.root}>
      <Box className={styles.container}>
        <Box mb='sm'>
          <Title order={2}>Регистрация</Title>
          {error && <Text size='sm' color='red'>{error}</Text>}
        </Box>
        <form className={styles.form} onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
          <TextInput label='Имя' mb='xs' {...form.getInputProps('name')} />
          <TextInput type='email' label='Почта' mb='xs' icon={<Mail size={16} />} {...form.getInputProps('email')} />
          <TextInput type='password' label='Пароль' mb='xs' icon={<Lock size={16} />} {...form.getInputProps('password')} />
          <PasswordInput label='Повторите пароль' mb='lg' icon={<Lock size={16} />} {...form.getInputProps('confirmedPassword')} />
          <Button type='submit' loading={isLoading} className={styles.button}>Зарегистрироваться</Button>
        </form>
        <Text size='sm'>Уже есть аккаунт? <Link to='/sign-in' className={styles.helpLink}>Войти</Link></Text>
      </Box>
    </Center>
  )
};

export default SignUp
