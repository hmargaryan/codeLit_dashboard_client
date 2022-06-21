import React, {Fragment, useEffect, useState} from 'react'

import {Text, Paper, Breadcrumbs, Anchor, Group, ActionIcon, Box, Tooltip, Menu, Button, Timeline } from '@mantine/core'
import {useModals} from '@mantine/modals'
import {showNotification} from "@mantine/notifications";
import dayjs from 'dayjs'
import {Link, useNavigate, useParams} from "react-router-dom";
import {Check, ClipboardCheck, ClipboardX, Edit, Trash, X} from "tabler-icons-react";


import ButtonAsLink from "../../components/ButtonAsLink";
import {
    useRemoveCandidateMutation,
    useFetchCandidateQuery,
    useEditCandidateStatusMutation
} from '../../store/services/candidateApi'
import { useFetchCandidateInterviewSessionsQuery } from '../../store/services/interviewApi'
import AddCandidate from '../Candidates/components/AddCandidate'
import CreateInterviewSession from './components/CreateInterviewSession'
import Results from './components/Results'

const renderBreadcrumbs = (name) => [
    { title: 'Кандидаты', to: '/' },
    { title: name },
].map(({title, to}, index) => {
    return to ? (
        <Anchor key={index} component={Link} to={to}>
            {title}
        </Anchor>
    ) : (
        <Text key={index} color='dimmed'>{title}</Text>
    )
})

const STATUS_MAP = {
    wait: 'Ожидание',
    interview: 'Интервью',
    review: 'Рассмотрение',
    offer: 'Оффер',
    reject: 'Отказ'
}

const Candidate = () => {
    const params = useParams()
    const [isAddCandidateModalOpened, setIsAddCandidateModalOpened] = useState(false)
    const [isCreateInterviewRoomModalOpened, setIsCreateInterviewRoomModalOpened] = useState(false)
    const [isResultsModalOpened, setIsResultsModalOpened] = useState(false)
    const [currentResult, setCurrentResult] = useState(null)
    const { data } = useFetchCandidateQuery(params?.id)
    const { data: interviewSessions } = useFetchCandidateInterviewSessionsQuery(params?.id)
    const [editCandidateStatus, { data: editingStatusData, loading: isEditingStatusLoading }] = useEditCandidateStatusMutation()
    const [removeCandidate, { data: removingData, error: removingError }] = useRemoveCandidateMutation()
    const modals = useModals()
    const navigate = useNavigate()

    useEffect(() => {
        if (editingStatusData) {
            showNotification({
                title: editingStatusData.message,
                color: 'teal',
                icon: <Check size={18} />
            })
        }
    }, [editingStatusData])

    useEffect(() => {
        if (removingData) {
            showNotification({
                title: removingData.message,
                color: 'teal',
                icon: <Check size={18} />
            })
            navigate('/')
        }
    }, [removingData])

    useEffect(() => {
        if (removingError) {
            showNotification({
                title: removingError.data.message,
                color: 'red',
                icon: <X size={18} />
            })
        }
    }, [removingError])

    const handleStatusChange = async (status) => {
        try {
            await editCandidateStatus({ id: data.id, body: { status } })
        } catch (error) {
            showNotification({
                title: error.data.message,
                color: 'red',
                icon: <X size={18} />
            })
        }
    }

    const handleAddCandidateModalToggle = () => {
        setIsAddCandidateModalOpened((prevState) => !prevState)
    }

    const handleCreateInterviewRoomModalToggle = () => {
        setIsCreateInterviewRoomModalOpened((prevState) => !prevState)
    }

    const handleResultsModalToggle = (index) => {
        if (Number.isInteger(index)) {
            setCurrentResult(interviewSessions[index].result)
        }
        setIsResultsModalOpened((prevState) => !prevState)
    }

    const openRemoveModal = () => modals.openConfirmModal({
        title: <Text size='lg' weight={700}>Удалить кандидата</Text>,
        centered: true,
        children: (
            <Text>Вы действительно хотите удалить?</Text>
        ),
        labels: { confirm: 'Да', cancel: 'Нет' },
        confirmProps: { color: 'red' },
        onConfirm: () => {
            removeCandidate(data.id)
        }
    })

    return (
        <Fragment>
            {data && (
                <Fragment>
                    <Breadcrumbs mb='sm'>{renderBreadcrumbs(data.name)}</Breadcrumbs>
                    <Results
                        isOpened={isResultsModalOpened}
                        onClose={handleResultsModalToggle}
                        data={currentResult}
                    />
                    <AddCandidate
                        isOpened={isAddCandidateModalOpened}
                        onClose={handleAddCandidateModalToggle}
                        currentCandidate={data} />
                    <CreateInterviewSession
                        isOpened={isCreateInterviewRoomModalOpened}
                        candidateId={data.id}
                        onClose={handleCreateInterviewRoomModalToggle} />
                    <Paper mb='md' p='md'>
                        <Group position='apart' align='flex-start'>
                            <Box>
                                <Box>
                                    <Text weight={700} sx={{ display: 'inline-block' }}>{data.name}&nbsp;</Text>
                                    <Text sx={{ display: 'inline-block' }}>({data.email})</Text>
                                </Box>
                                <Text>Позиция: {data.position}</Text>
                                <Text>Уровень: {data.level}</Text>
                                <Text>Статус: {STATUS_MAP[data.status]}</Text>
                            </Box>

                            <Group>
                                <Tooltip label='Оффер'>
                                    <ActionIcon
                                        color='green'
                                        variant='light'
                                        loading={isEditingStatusLoading}
                                        onClick={() => handleStatusChange('offer')}>
                                        <ClipboardCheck />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label='Отказ'>
                                    <ActionIcon
                                        color='red'
                                        variant='light'
                                        loading={isEditingStatusLoading}
                                        onClick={() => handleStatusChange('reject')}>
                                        <ClipboardX />
                                    </ActionIcon>
                                </Tooltip>
                                <Menu>
                                    <Menu.Item
                                        icon={<Edit size={14} />}
                                        onClick={handleAddCandidateModalToggle}>
                                        Изменить
                                    </Menu.Item>
                                    <Menu.Item
                                        color='red'
                                        icon={<Trash size={14} />}
                                        onClick={openRemoveModal}>
                                        Удалить
                                    </Menu.Item>
                                </Menu>
                            </Group>
                        </Group>
                    </Paper>
                    <Paper p='md'>
                        {interviewSessions?.length > 0 ? (
                            <Timeline active={interviewSessions.length - 1} mb='sm'>
                                {interviewSessions.map((interviewSession, index) => {
                                    return (
                                        <Timeline.Item title={
                                            <Group>
                                                <Text>{interviewSession.name}</Text>
                                                <Menu>
                                                    <Menu.Item
                                                        icon={<Edit size={14} />}>
                                                        Изменить
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        color='red'
                                                        icon={<Trash size={14} />}>
                                                        Удалить
                                                    </Menu.Item>
                                                </Menu>
                                            </Group>
                                        } key={interviewSession.id}>
                                            <Box>
                                                <Text color='dimmed' size='sm'>Интервьюер: {interviewSession?.workspaceMember?.user?.name}</Text>
                                                <Text color='dimmed' size='sm'>Шаблон: {interviewSession?.template?.data?.name}</Text>
                                                <Text color='dimmed' size='sm'>Комментарии: {interviewSession?.comments || '–'}</Text>
                                            </Box>
                                            <Text size="xs" mt={4} mb='sm'>
                                                {dayjs(interviewSession.date).locale('ru').format('MMM D, YYYY')}&nbsp;
                                                {dayjs(interviewSession.time).locale('ru').format('h:mm')}
                                            </Text>
                                            {interviewSession.result ? (
                                                    <Button variant="light" compact onClick={() => handleResultsModalToggle(index)}>
                                                        Результаты интервью
                                                    </Button>
                                            ) : (
                                                <Anchor component={Link} to={`/room/${interviewSession.id}`} target='_blank'>
                                                    Ссылка на комнату
                                                </Anchor>
                                            )}
                                        </Timeline.Item>
                                    )
                                })}
                            </Timeline>
                        ) : (
                            <Text mb='sm'>Данных по собеседованиям нет</Text>
                        )}
                        <Button compact onClick={handleCreateInterviewRoomModalToggle}>Создать комнату для интервью</Button>
                    </Paper>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Candidate

// upperFirst(dayjs(_value).locale(finalLocale).format(dateFormat))
