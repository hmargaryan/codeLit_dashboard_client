import React, { useEffect, useState } from 'react'

import {
    Modal,
    Text,
    TextInput,
    Button,
    Select
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import {Check, Mail} from 'tabler-icons-react'

import { useAddCandidateMutation, useEditCandidateMutation } from '../../../store/services/candidateApi'
import { addCandidateSchema } from '../../../utils/validationSchemes'

const STATUS = [
    { label: 'Ожидание', value: 'wait' },
    { label: 'Интервью', value: 'interview' },
    { label: 'Рассмотрение', value: 'review' },
    { label: 'Оффер', value: 'offer' },
    { label: 'Отказ', value: 'reject' }
]

const AddCandidate = ({ isOpened, onClose, currentCandidate }) => {
    const [addCandidate, { data: addingData, loading: isAddingLoading }] = useAddCandidateMutation()
    const [editCandidate, { data: editingData, loading: isEditingLoading }] = useEditCandidateMutation()
    const [error, setError] = useState(null)
    const form = useForm({
        schema: yupResolver(addCandidateSchema),
        initialValues: {
            name: '',
            email: '',
            position: '',
            level: '',
            status: ''
        }
    })

    const handleModalClose = () => {
        form.reset()
        onClose()
    }

    useEffect(() => {
        if (addingData) {
            showNotification({
                title: addingData.message,
                color: 'teal',
                icon: <Check size={18} />
            })
        }
    }, [addingData])

    useEffect(() => {
        if (editingData) {
            showNotification({
                title: editingData.message,
                color: 'teal',
                icon: <Check size={18} />
            })
        }
    }, [editingData])

    useEffect(() => {
        if (currentCandidate) {
            form.setValues({
                name: currentCandidate.name,
                position: currentCandidate.position,
                level: currentCandidate.level,
                status: currentCandidate.status
            })
        }
    }, [currentCandidate])

    const handleFormSubmit = async (values, e) => {
        e.preventDefault()
        setError(null)

        try {
            if (currentCandidate) {
                await editCandidate({ id: currentCandidate.id, body: values }).unwrap()
            } else {
                await addCandidate(values).unwrap()
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
            title={<Text size='lg' weight={700}>{currentCandidate ? 'Изменить' : 'Добавить'} кандидата</Text>}
            closeButtonLabel='Закрыть окно добавления кандидата'
            onClose={handleModalClose}>
            {error && <Text size='sm' color='red'>{error}</Text>}
            <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
                <TextInput label='Имя' placeholder='Гамлет Маргарян' mb='xs' {...form.getInputProps('name')} />
                <TextInput type='email' label='Почта' mb='xs' icon={<Mail size={16} />} {...form.getInputProps('email')} />
                <TextInput label='Позиция' placeholder='iOS-разработчик' mb='xs' {...form.getInputProps('position')} />
                <TextInput label='Уровень' placeholder='Middle' mb='xs' {...form.getInputProps('level')} />
                <Select
                    label='Статус'
                    description='Выберите на каком этапе находится кандидат'
                    defaultValue='wait'
                    data={STATUS}
                    mb='lg'
                    {...form.getInputProps('status')}
                />
                <Button
                    type='submit'
                    loading={isAddingLoading || isEditingLoading}
                    sx={{ width: '100%' }}>
                    {currentCandidate ? 'Изменить' : 'Добавить'}
                </Button>
            </form>
        </Modal>
    )
}

export default AddCandidate
