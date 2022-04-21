import React, { useState, useEffect } from 'react'
import {
  Modal,
  Text,
  TextInput,
  Textarea,
  Button
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Check } from 'tabler-icons-react'
import { useCreateTaskMutation, useEditTaskMutation } from '../../../store/services/taskApi'
import { addTaskSchema } from '../../../utils/validationSchemes'

const CreateTask = ({ isOpened, onClose, currentTask }) => {
  const [createTask, { data: createdTask, isLoading: isCreatingLoading }] = useCreateTaskMutation()
  const [editTask, { data: editedTask, isLoading: isEditingLoading }] = useEditTaskMutation()
  const [error, setError] = useState(null)
  const form = useForm({
    schema: yupResolver(addTaskSchema),
    initialValues: {
      name: '',
      description: '',
      example: ''
    }
  })

  const handleModalClose = () => {
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (currentTask) {
      form.setValues({
        name: currentTask.name,
        description: currentTask.description,
        example: currentTask.example
      })
    }
  }, [currentTask])

  useEffect(() => {
    if (createdTask) {
      showNotification({
        title: createdTask.message,
        color: 'teal',
        icon: <Check size={18} />
      })
    }
  }, [createdTask])

  const handleFormSubmit = async (values, e) => {
    e.preventDefault()
    setError(null)

    try {
      if (currentTask) {
        console.log(values);
        await editTask({ id: currentTask.id, body: values }).unwrap()
      } else {
        await createTask(values).unwrap()
      }
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
      title={<Text size='lg' weight={700}>{currentTask ? 'Изменить' : 'Добавить'} задачу</Text>}
      closeButtonLabel='Закрыть окно добавления участников'
      onClose={handleModalClose}>
      {error && <Text size='sm' color='red'>{error}</Text>}
      <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
        <TextInput label='Название' placeholder='Поиск гласных' mb='xs' {...form.getInputProps('name')} />
        <Textarea
          label='Описание'
          description='Описание задачи будет добавлено в редактор кода в виде комментария'
          placeholder='Нужно написать функцию, принимающую строку в качестве аргумента и возвращающую количество гласных, которые содержатся в строке. Гласными являются «a», «e», «i», «o», «u».'
          autosize
          minRows={3}
          maxRows={10}
          mb='xs'
          {...form.getInputProps('description')} />
        <Textarea
          label='Пример кода'
          placeholder="console.log(findVowels('barcode')) // --> 3"
          autosize
          minRows={3}
          maxRows={10}
          mb='lg'
          {...form.getInputProps('example')} />
        <Button
          type='submit'
          loading={isCreatingLoading || isEditingLoading}
          sx={{ width: '100%' }}>
          {currentTask ? 'Изменить' : 'Добавить'}
        </Button>
      </form>
    </Modal>
  )
}

export default CreateTask