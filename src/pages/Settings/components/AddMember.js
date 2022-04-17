import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Modal,
  Text,
  TextInput,
  Button,
  Select,
  Checkbox,
  PasswordInput,
  Box,
  Switch
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Mail, Lock, Check } from 'tabler-icons-react'
import { useAddMemberMutation } from '../../../store/services/workspaceMemberApi'
import { workspaceApi } from '../../../store/services/workspaceApi'
import { addMemberSchema, addUserSchema } from '../../../utils/validationSchemes'

const ROLES = [
  { value: 'member', label: 'Участник' },
  { value: 'admin', label: 'Администратор' },
]

const AddMember = ({ isOpened, onClose }) => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [addMember, { data, isLoading }] = useAddMemberMutation()
  const form = useForm({
    schema: yupResolver(isNewUser ? addUserSchema : addMemberSchema),
    initialValues: {
      email: '',
      role: '',
      canAddCandidate: false,
      name: '',
      password: '',
      confirmedPassword: ''
    }
  })
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const handleNewUserSwitchToggle = () => {
    setIsNewUser((prevState) => !prevState)
  }

  useEffect(() => {
    if (data) {
      showNotification({
        title: data.message,
        color: 'teal',
        icon: <Check size={18} />
      })
      dispatch(workspaceApi.util.invalidateTags(['WorkspaceMembers']))
    }
  }, [data])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()
    setError(null)

    try {
      let preparedValues = null
      if (!isNewUser) {
        preparedValues = { email: values.email, role: values.role, canAddCandidate: values.canAddCandidate }
      } else {
        preparedValues = values
      }

      await addMember({ ...preparedValues, isNewUser }).unwrap()
    } catch (error) {
      if (error?.data?.field) {
        form.setFieldError(error.data.field, error.data.message)
      } else {
        setError(error.data.message)
      }
    }
  }

  return (
    <Modal
      opened={isOpened}
      title={<Text size='lg' weight={700}>Добавить участника</Text>}
      closeButtonLabel='Закрыть окно добавления участников'
      onClose={onClose}>
      {error && <Text size='sm' color='red'>{error}</Text>}
      <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
        <TextInput type='email' label='Почта' mb='xs' icon={<Mail size={16} />} {...form.getInputProps('email')} />
        <Select label='Роль' placeholder='Выберите роль' data={ROLES} mb='lg' {...form.getInputProps('role')} />
        <Checkbox label='Может добавлять кандидатов' mb='lg' {...form.getInputProps('canAddCandidate')} />
        {isNewUser && (
          <Fragment>
            <TextInput label='Имя' mb='xs' {...form.getInputProps('name')} />
            <TextInput type='password' label='Пароль' mb='xs' icon={<Lock size={16} />} {...form.getInputProps('password')} />
            <PasswordInput label='Повторите пароль' mb='lg' icon={<Lock size={16} />} {...form.getInputProps('confirmedPassword')} />
          </Fragment>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type='submit' loading={isLoading}>Добавить</Button>
          <Switch
            label='Новый пользователь'
            checked={isNewUser}
            {...form.getInputProps('confirmedPassword')}
            onChange={handleNewUserSwitchToggle} />
        </Box>
      </form>
    </Modal>
  )
}

export default AddMember