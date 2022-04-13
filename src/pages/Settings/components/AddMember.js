import React, { Fragment, useState, useEffect } from 'react'
import {
  Modal,
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
import { Mail, Lock } from 'tabler-icons-react'
import { useAddMemberMutation } from '../../../store/services/workspaceMemberApi'
import { addMemberSchema, addUserSchema } from '../../../utils/validationSchemes'

const ROLES = [
  { value: 'member', label: 'Участник' },
  { value: 'admin', label: 'Администратор' },
]

const AddMember = ({ isOpened, onClose }) => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [addMember, { data, isLoading }] = useAddMemberMutation()
  console.log(isLoading, data)
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

  const handleNewUserSwitchToggle = () => {
    setIsNewUser((prevState) => !prevState)
  }

  useEffect(() => {
    if (data) {
      showNotification({
        title: 'Пользователь добавился в рабочее пространство',
        message: 'Перезагрузите страницу для обновления таблицы',
      })
    }
  }, [data])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()

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
      }
    }
  }

  return (
    <Modal
      opened={isOpened}
      title='Добавить участника'
      closeButtonLabel='Закрыть окно добавления участников'
      onClose={onClose}>
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