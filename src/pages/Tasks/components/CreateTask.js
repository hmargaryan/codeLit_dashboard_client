import React, { useState, useEffect } from 'react'
import {
  Modal,
  Text,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Box,
  Button
} from '@mantine/core'
import { RichTextEditor } from '@mantine/rte'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Check } from 'tabler-icons-react'
import { useCreateTaskMutation, useEditTaskMutation } from '../../../store/services/taskApi'
import { addTaskSchema } from '../../../utils/validationSchemes'

const DIFFICULTY = [
  { value: 'easy', label: 'Легкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'hard', label: 'Сложный' }
]

const CreateTask = ({ isOpened, onClose, currentTask }) => {
  const [createTask, { data: createdTask, isLoading: isCreatingLoading }] = useCreateTaskMutation()
  const [editTask, { data: editedTask, isLoading: isEditingLoading }] = useEditTaskMutation()
  const [error, setError] = useState(null)
  const form = useForm({
    schema: yupResolver(addTaskSchema),
    initialValues: {
      name: '',
      description: '',
      difficulty: '',
      template: '',
      additionalInfo: ''
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
        difficulty: currentTask.difficulty,
        time: currentTask.time,
        template: currentTask.template,
        additionalInfo: currentTask.additionalInfo
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
      size='xl'
      onClose={handleModalClose}>
      {error && <Text size='sm' color='red'>{error}</Text>}
      <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
        <TextInput label='Название' placeholder='Поиск гласных' mb='xs' {...form.getInputProps('name')} />
        <Textarea
          label='Описание'
          placeholder='Нужно написать функцию, принимающую строку в качестве аргумента и возвращающую количество гласных, которые содержатся в строке. Гласными являются «a», «e», «i», «o», «u».'
          autosize
          minRows={3}
          maxRows={10}
          mb='xs'
          {...form.getInputProps('description')} />
        <Select
            label='Уровень сложности'
            placeholder='Выберите уровень'
            clearable
            data={DIFFICULTY}
            mb='xs'
            {...form.getInputProps('difficulty')} />
        <NumberInput
            label='Время на выполнение'
            description='В минутах'
            placeholder='Укажите время на выполнение'
            min={1}
            mb='xs'
            {...form.getInputProps('time')} />
        <Textarea
          label='Шаблон'
          description='Вы можете указать базовый шаблон кода, консольные тесткейсы и т.п. Текст ниже будет вставлен в редактор кода'
          placeholder="console.log(findVowels('barcode')) // --> 3"
          autosize
          minRows={3}
          maxRows={10}
          mb='xs'
          {...form.getInputProps('template')} />
        <Box>
          <Text size='sm' mb={4}>Дополнительная информация</Text>
          <RichTextEditor
              controls={[
                ['bold', 'italic', 'underline', 'strike', 'clean'],
                ['h1', 'h2', 'h3', 'h4', 'h5'],
                ['unorderedList', 'orderedList'],
                ['link', 'blockquote', 'codeBlock'],
                ['alignLeft', 'alignCenter', 'alignRight'],
                ['sup', 'sub']
              ]}
              mb='lg'
              {...form.getInputProps('additionalInfo')} />
        </Box>
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
