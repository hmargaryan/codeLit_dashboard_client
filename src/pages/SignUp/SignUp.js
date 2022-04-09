import React, { useState, useEffect } from 'react'
import {
  Center,
  Box,
  Stack,
  Paper,
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
import { useSignUpMutation } from '../../store/services/userApi'
import { signUpSchema } from '../../utils/validationSchemes'
import styles from '../../styles/Sign.module.css'

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
      console.log(data)
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
      <Paper className={styles.paper} p='xl' shadow='sm'>
        <Box mb='sm'>
          <Title order={2}>Регистрация</Title>
          {error && <Text size='sm' color='red'>{error}</Text>}
        </Box>
        <form className={styles.form} onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
          <Stack>
            <TextInput label='Имя' {...form.getInputProps('name')} />
            <TextInput type='email' label='Почта' icon={<Mail size={16} />} {...form.getInputProps('email')} />
            <TextInput type='password' label='Пароль' icon={<Lock size={16} />} {...form.getInputProps('password')} />
            <PasswordInput label='Повторите пароль' icon={<Lock size={16} />} mb='xs' {...form.getInputProps('confirmedPassword')} />
            <Button type='submit' loading={isLoading} className={styles.button}>Зарегистрироваться</Button>
          </Stack>
        </form>
        <Text size='sm'>Уже есть аккаунт? <Link to='/sign-in' className={styles.helpLink}>Войти</Link></Text>
      </Paper>
    </Center>
  )
};

export default SignUp
