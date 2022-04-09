import React, { useState, useEffect } from 'react'
import {
  Center,
  Box,
  Paper,
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Mail, Lock } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import cookie from 'js-cookie'
import { useSignInMutation } from '../../store/services/userApi'
import { signInSchema } from '../../utils/validationSchemes'
import styles from '../../styles/Sign.module.css'

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

  useEffect(() => {
    if (data) {
      cookie.set('user', JSON.stringify(data), { expires: 7 })
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
      <Paper className={styles.paper} p='xl' shadow='sm'>
        <Box mb='sm'>
          <Title order={2}>Вход</Title>
          {error && <Text size='sm' color='red'>{error}</Text>}
        </Box>
        <form className={styles.form} onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
          <Stack>
            <TextInput type='email' label='Почта' icon={<Mail size={16} />} {...form.getInputProps('email')} />
            <PasswordInput label='Пароль' mb='xs' icon={<Lock size={16} />} {...form.getInputProps('password')} />
            <Button type='submit' loading={isLoading} className={styles.button}>Войти</Button>
          </Stack>
        </form>
        <Text size='sm'>Нет аккаунта? <Link to='/sign-up' className={styles.helpLink}>Зарегистрироваться</Link></Text>
      </Paper>
    </Center>
  )
};

export default SignIn
