import React, {Fragment, useEffect, useState} from 'react'

import {
    Box,
    Button,
    Menu,
    Table,
    Text,
    TextInput,
    Title,
    SegmentedControl,
    useMantineTheme
} from '@mantine/core'
import {useDebouncedValue} from "@mantine/hooks";
import {useModals} from '@mantine/modals'
import {showNotification} from "@mantine/notifications";
import { useNavigate } from 'react-router-dom'
import {Check, Edit, Search, Trash, X} from 'tabler-icons-react'

import { useFetchCandidatesQuery, useRemoveCandidateMutation } from '../../store/services/candidateApi'
import AddCandidate from './components/AddCandidate'

const STATUS = [
    { label: 'Все', value: 'all' },
    { label: 'Ожидание', value: 'wait' },
    { label: 'Интервью', value: 'interview' },
    { label: 'Рассмотрение', value: 'review' },
    { label: 'Оффер', value: 'offer' },
    { label: 'Отказ', value: 'reject' }
]

const STATUS_MAP = {
    wait: 'Ожидание',
    interview: 'Интервью',
    review: 'Рассмотрение',
    offer: 'Оффер',
    reject: 'Отказ'
}

const Candidates = () => {
    const [isAddCandidateModalOpened, setIsAddCandidateModalOpened] = useState(false)
    const [currentCandidate, setCurrentCandidate] = useState(null)
    const [status, setStatus] = useState('all')
    const [term, setTerm] = useState('')
    const [debouncedTerm] = useDebouncedValue(term, 500)
    const { data: candidates } = useFetchCandidatesQuery({ term: debouncedTerm, status })
    const [removeCandidate, { data, error }] = useRemoveCandidateMutation()
    const theme = useMantineTheme()
    const modals = useModals()
    const navigate = useNavigate()

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

    const handleStatusChange = (value) => {
        setStatus(value)
    }

    const handleAddCandidateModalToggle = () => {
        if (isAddCandidateModalOpened) {
            setCurrentCandidate(null)
        }

        setIsAddCandidateModalOpened((prevState) => !prevState)
    }

    const openRemoveModal = (id) => modals.openConfirmModal({
        title: <Text size='lg' weight={700}>Удалить кандидата</Text>,
        centered: true,
        children: (
            <Text>Вы действительно хотите удалить?</Text>
        ),
        labels: { confirm: 'Да', cancel: 'Нет' },
        confirmProps: { color: 'red' },
        onConfirm: () => {
            removeCandidate(id)
        }
    })

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

    const onCandidatesTableClick = (event) => {
        const buttonTarget = event.target.closest('button')
        const rowTarget = event.target.closest('tr')

        if (buttonTarget?.dataset?.candidateDeleteId) {
            openRemoveModal(buttonTarget?.dataset?.candidateDeleteId)
            return
        }

        if (buttonTarget?.dataset?.candidateEditId) {
            setCurrentCandidate(candidates.find(({ id }) => id === buttonTarget.dataset.candidateEditId))
            handleAddCandidateModalToggle()
            return
        }

        if (rowTarget?.dataset?.candidateId && !buttonTarget) {
            navigate(`/candidate/${rowTarget?.dataset?.candidateId}`)
        }
    }

    return (
       <Fragment>
           <AddCandidate
               isOpened={isAddCandidateModalOpened}
               onClose={handleAddCandidateModalToggle}
               currentCandidate={currentCandidate} />
           <Title order={2} sx={{
               color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
               marginBottom: theme.spacing.xs
           }}>
               Кандидаты
           </Title>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.sm }}>
               <TextInput icon={<Search size={16} />} placeholder='Найти кандидата' onChange={handleTermChange} />
               <SegmentedControl data={STATUS} value={status} onChange={handleStatusChange} />
               <Button variant='light' onClick={handleAddCandidateModalToggle}>Добавить кандидата</Button>
           </Box>
           {candidates && (
               <Table fontSize='md' mb='sm' striped highlightOnHover>
                   <thead>
                   <tr>
                       <th>Имя</th>
                       <th>Позиция</th>
                       <th>Уровень</th>
                       <th>Статус</th>
                       <th></th>
                   </tr>
                   </thead>
                   <tbody onClick={onCandidatesTableClick}>{candidates.map(({ id, name, position, level, status }) => {
                       return (
                           <tr key={id} data-candidate-id={id} style={{ cursor: 'pointer' }}>
                               <td>{name}</td>
                               <td>{position}</td>
                               <td>{level}</td>
                               <td>{STATUS_MAP[status]}</td>
                               <td>
                                   <Menu>
                                       <Menu.Item
                                           icon={<Edit size={14} />}
                                           data-candidate-edit-id={id}>
                                           Изменить
                                       </Menu.Item>
                                       <Menu.Item
                                           color='red'
                                           icon={<Trash size={14} />}
                                           data-candidate-delete-id={id}>
                                           Удалить
                                       </Menu.Item>
                                   </Menu>
                               </td>
                           </tr>
                       )
                   })}</tbody>
               </Table>
           )}
       </Fragment>
    )
}

export default Candidates
