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
import { useSignInMutation } from '../store/services/userApi'
import { signInSchema } from '../utils/validationSchemes'
import styles from '../styles/Sign.module.css'

const SignIn = () => {
  const form = useForm({
    schema: yupResolver(signInSchema),
    initialValues: {
      email: '',
      password: ''
    }
  })
  const [signIn, { data, isLoading }] = useSignInMutation()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      cookie.set('user', JSON.stringify(data), { expires: 7 })
      navigate('/choose-workspace')
    }
  }, [data])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()
    setError(null)

    try {
      await signIn(values).unwrap()
    } catch (error) {
      setError(error.data.message)
    }
  }

  return (
    <Center className={styles.root}>
      <Box className={styles.container}>
        <Box mb='sm'>
          <Title order={2}>Вход</Title>
          {error && <Text size='sm' color='red'>{error}</Text>}
        </Box>
        <form className={styles.form} onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
          <TextInput type='email' label='Почта' mb='xs' icon={<Mail size={16} />} {...form.getInputProps('email')} />
          <PasswordInput label='Пароль' mb='lg' icon={<Lock size={16} />} {...form.getInputProps('password')} />
          <Button type='submit' loading={isLoading} className={styles.button}>Войти</Button>
        </form>
        <Text size='sm'>Нет аккаунта? <Link to='/sign-up' className={styles.helpLink}>Зарегистрироваться</Link></Text>
      </Box>
    </Center>
  )
};

export default SignIn
