import React, { useEffect } from 'react'
import {
  Box,
  Center,
  Title,
  TextInput,
  Button
} from '@mantine/core'
import cookie from 'js-cookie'
import { useForm, yupResolver } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { useCreateWorkspaceMutation } from '../../store/services/workspaceApi'
import { createWorkspaceSchema } from '../../utils/validationSchemes'
import styles from './CreateWorkspace.module.css'

const CreateWorkspace = () => {
  const form = useForm({
    schema: yupResolver(createWorkspaceSchema),
    initialValues: {
      name: '',
      slug: ''
    }
  })
  const [createWorkspace, { data, isLoading }] = useCreateWorkspaceMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      cookie.set('user', JSON.stringify(data), { expires: 7 })
      navigate('/')
    }
  }, [data, navigate])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()

    try {
      await createWorkspace(values).unwrap()
    } catch (error) {
      if (error?.data?.field) {
        form.setFieldError(error.data.field, error.data.message)
      }
    }
  }

  return (
    <Center className={styles.root}>
      <Box className={styles.container}>
        <Title order={2} mb='sm'>Рабочее пространство</Title>
        <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
          <TextInput label='Название' mb='xs' {...form.getInputProps('name')} />
          <TextInput label='Слаг' mb='lg' {...form.getInputProps('slug')} />
          <Button type='submit' loading={isLoading} sx={{ width: '100%' }}>Создать</Button>
        </form>
      </Box>
    </Center>
  )
}

export default CreateWorkspace