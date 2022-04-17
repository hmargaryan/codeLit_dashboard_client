import React, { useEffect } from 'react'
import {
  Box,
  Center,
  Title,
  Select,
  Button,
  Text
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { useFetchWorkspacesQuery, useChooseWorkspaceMutation } from '../../store/services/workspaceApi'
import { chooseWorkspaceSchema } from '../../utils/validationSchemes'
import styles from './ChooseWorkspace.module.css'

const ChooseWorkspace = () => {
  const { data: workspaces, refetch: refetchWorkspaces } = useFetchWorkspacesQuery()
  const [chooseWorkspace, { data, isLoading, error }] = useChooseWorkspaceMutation()
  const navigate = useNavigate()
  const form = useForm({
    schema: yupResolver(chooseWorkspaceSchema),
    initialValues: { id: '' }
  })

  useEffect(() => {
    if (data) {
      cookie.set('user', JSON.stringify(data), { expires: 7 })
      navigate('/')
    }
  }, [data, navigate])

  useEffect(() => {
    refetchWorkspaces()
  }, [refetchWorkspaces])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()
    try {
      await chooseWorkspace(values)
    } catch { }
  }

  return (
    <Center className={styles.root}>
      <Box className={styles.container}>
        <Box mb='sm'>
          <Title order={2}>Рабочее пространство</Title>
          {error && <Text size='sm' color='red'>{error.data.message}</Text>}
        </Box>

        {workspaces && (
          <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
            <Select
              placeholder='Выберите рабочее пространство'
              data={workspaces.map(({ id, name }) => ({ value: id, label: name }))}
              searchable
              nothingFound='Не найдено'
              mb='lg'
              {...form.getInputProps('id')} />
            <Button type='submit' loading={isLoading} sx={{ width: '100%' }}>Войти</Button>
          </form>
        )}
      </Box>
    </Center>
  )
}

export default ChooseWorkspace