import React, { useEffect, useState } from 'react'

import {
    Modal,
    Text,
    TextInput,
    Button,
    Select, Textarea
} from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { Check, Clock } from 'tabler-icons-react'

import 'dayjs/locale/ru'
import { useCreateInterviewSessionMutation } from '../../../store/services/interviewApi'
import { useFetchTemplatesQuery } from '../../../store/services/templateApi'
import { useFetchWorkspaceMembersQuery } from '../../../store/services/workspaceApi'
import { createInterviewRoomSchema } from '../../../utils/validationSchemes'

const CreateInterviewSession = ({ isOpened, candidateId, onClose }) => {
    const { data: templates } = useFetchTemplatesQuery()
    const [createInterviewSession, { data, loading }] = useCreateInterviewSessionMutation()
    const { data: workspaceMembers } = useFetchWorkspaceMembersQuery()
    const [error, setError] = useState(null)
    const form = useForm({
        schema: yupResolver(createInterviewRoomSchema),
        initialValues: {
            name: '',
            template: '',
            interviewer: '',
            date: '',
            time: null,
            comments: ''
        }
    })

    const handleModalClose = () => {
        form.reset()
        onClose()
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

    const handleFormSubmit = async (values, e) => {
        e.preventDefault()
        setError(null)

        try {
            createInterviewSession({ ...values, candidateId }).unwrap()
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
            title={<Text size='lg' weight={700}>Создание комнаты</Text>}
            closeButtonLabel='Закрыть окно создания комнаты'
            onClose={handleModalClose}>
            {error && <Text size='sm' color='red'>{error}</Text>}
            <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
                <TextInput label='Название' placeholder='Скриннинг' mb='xs' {...form.getInputProps('name')} />
                <Select
                    label='Шаблон'
                    description='Выберите шаблон, по которому будет проходить интервью'
                    data={templates?.map((template) => ({ label: template.data.name, value: template.id }))}
                    mb='xs'
                    {...form.getInputProps('template')}
                />
                <Select
                    label='Интервьюер'
                    description='Выберите человека, который будет проводить собеседование'
                    data={workspaceMembers?.map((workspaceMember) => ({ label: workspaceMember.name, value: workspaceMember.id }))}
                    mb='xs'
                    {...form.getInputProps('interviewer')}
                />
                <DatePicker
                    locale='ru'
                    placeholder='Выберите дату интервью'
                    minDate={new Date()}
                    label='Дата'
                    mb='xs'
                    {...form.getInputProps('date')} />
                <TimeInput
                    label='Время'
                    icon={<Clock size={16} />}
                    placeholder='Выберите время интервью'
                    clearable
                    mb='xs'
                    {...form.getInputProps('time')} />
                <Textarea
                    label='Комментарии'
                    placeholder='Если есть дополнительная информация, напишите ее'
                    autosize
                    minRows={3}
                    maxRows={10}
                    mb='lg'
                    {...form.getInputProps('comments')} />
                <Button
                    type='submit'
                    loading={loading}
                    sx={{ width: '100%' }}>
                    Создать
                </Button>
            </form>
        </Modal>
    )
}

export default CreateInterviewSession
