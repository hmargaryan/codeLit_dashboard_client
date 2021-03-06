import React, { Fragment, useState, useEffect } from 'react'
import {
  Title,
  Box,
  TextInput,
  Button,
  Text,
  Accordion,
  Space,
  useMantineTheme
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { Prism } from '@mantine/prism'
import { RichTextEditor } from '@mantine/rte'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { Search, Check, X } from 'tabler-icons-react'
import { useFetchTasksQuery, useDeleteTaskMutation } from '../../store/services/taskApi'
import CreateTask from './components/CreateTask'

const DIFFICULTY_MAP = {
  easy: 'легкий',
  medium: 'средний',
  hard: 'сложный'
}

const Tasks = () => {
  const theme = useMantineTheme()
  const modals = useModals()
  const [term, setTerm] = useState('')
  const [debouncedTerm] = useDebouncedValue(term, 500)
  const [isCreateTaskModalOpened, setIsCreateTaskModalOpened] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const { data: tasks } = useFetchTasksQuery(debouncedTerm)
  const [deleteMutation, { data, error }] = useDeleteTaskMutation()

  const handleTermChange = (event) => {
    setTerm(event.target.value)
  }

  const handleCreateTaskModalToggle = () => {
    if (isCreateTaskModalOpened) {
      setCurrentTask(null)
    }

    setIsCreateTaskModalOpened((prevState) => !prevState)
  }

  const handleAccordionClick = (event) => {
    const target = event.target.closest('button')

    if (target?.dataset?.editId) {
      setCurrentTask(tasks.find(({ id }) => id === target.dataset.editId))
      handleCreateTaskModalToggle()
    } else if (target?.dataset?.deleteId) {
      modals.openConfirmModal({
        title: <Text size='lg' weight={700}>Удалить задачу</Text>,
        centered: true,
        children: (
          <Text>Вы действительно хотите удалить?</Text>
        ),
        labels: { confirm: 'Да', cancel: 'Нет' },
        confirmProps: { color: 'red' },
        onConfirm: () => {
          deleteMutation(target.dataset.deleteId)
        }
      })
    }
  }

  useEffect(() => {
    if (data) {
      showNotification({
        title: data.message,
        color: 'teal',
        icon: <Check size={18} />
      })
    }
  }, [data])

  useEffect(() => {
    if (error) {
      showNotification({
        title: error.data.message,
        color: 'red',
        icon: <X size={18} />
      })
    }
  }, [error])

  return (
    <Fragment>
      <CreateTask
        isOpened={isCreateTaskModalOpened}
        onClose={handleCreateTaskModalToggle}
        currentTask={currentTask}
      />
      <Title order={2} sx={{
        color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
        marginBottom: theme.spacing.xs
      }}>
        Задачи
      </Title>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.sm }}>
        <TextInput icon={<Search size={16} />} placeholder='Найти задачу' onChange={handleTermChange} />
        <Button variant='light' onClick={handleCreateTaskModalToggle}>Создать задачу</Button>
      </Box>
      {tasks && (
        <Accordion onClick={handleAccordionClick}>
          {tasks.map(({ id, name, description, difficulty, time, template, additionalInfo }) => {
            return (
              <Accordion.Item key={id} label={name}>
                <Text mb='sm'>
                  <Text weight='bold' sx={{ display: 'inline' }}>Описание: </Text>
                  {description}
                </Text>
                {difficulty && (
                    <Text mb='sm'>
                      <Text weight='bold' sx={{ display: 'inline' }}>Уровень сложности: </Text>
                      {DIFFICULTY_MAP[difficulty]}
                    </Text>
                )}
                {time && (
                    <Text mb='sm'>
                      <Text weight='bold' sx={{ display: 'inline' }}>Время на выполнение: </Text>
                      {time} мин
                    </Text>
                )}
                {template && (
                    <Box mb='sm'>
                      <Text weight='bold' mb={4}>Шаблон: </Text>
                      <Prism
                          sx={{
                            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]}`,
                            borderRadius: 4
                          }}
                          language='javascript'>
                        {template}
                      </Prism>
                    </Box>
                )}
                {additionalInfo !== '<p><br></p>' && (
                    <Box mb='sm'>
                      <Text weight='bold' mb={4}>Дополнительная информация: </Text>
                      <RichTextEditor readOnly value={additionalInfo}/>
                    </Box>
                )}
                <Space h='md' />
                <Box>
                  <Button
                    type='button'
                    compact
                    variant='light'
                    mr='xs'
                    data-edit-id={id}>
                    Изменить
                  </Button>
                  <Button
                    type='button'
                    compact
                    variant='light'
                    color='red'
                    data-delete-id={id}>
                    Удалить
                  </Button>
                </Box>
              </Accordion.Item>
            )
          })}
        </Accordion>
      )}
    </Fragment>
  )
}

export default Tasks
