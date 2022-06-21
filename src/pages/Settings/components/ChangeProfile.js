import React, { Fragment, useState, useEffect } from 'react'

import {
    Modal,
    Text,
    TextInput,
    Button, PasswordInput
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useDispatch } from 'react-redux'
import { Mail, Lock, Check } from 'tabler-icons-react'

import { workspaceApi } from '../../../store/services/workspaceApi'
import { useAddMemberMutation } from '../../../store/services/workspaceMemberApi'
import { addMemberSchema, addUserSchema } from '../../../utils/validationSchemes'

const ChangeProfile = ({ isOpened, onClose }) => {
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
            title={<Text size='lg' weight={700}>Изменить профиль</Text>}
            closeButtonLabel='Закрыть окно добавления участников'
            onClose={onClose}>
            {error && <Text size='sm' color='red'>{error}</Text>}
            <form onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}>
                <TextInput label='Имя' mb='xs' value='Hamlet Margaryan'/>
                <TextInput type='email' label='Почта' mb='lg' value='hamlet@gmail.com' icon={<Mail size={16} />} />
                <TextInput type='password' label='Пароль' mb='xs' icon={<Lock size={16} />}/>
                <PasswordInput label='Повторите пароль' mb='lg' icon={<Lock size={16} />}/>
                <Button type='submit' sx={{ width: '100%' }} loading={isLoading}>Изменить</Button>
            </form>
        </Modal>
    )
}

export default ChangeProfile
