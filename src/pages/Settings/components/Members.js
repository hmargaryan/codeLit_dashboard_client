import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Title,
  Table,
  Button,
  Menu,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { Edit, Trash, Check, X } from 'tabler-icons-react'
import { useRemoveMemberMutation } from '../../../store/services/workspaceMemberApi'
import { workspaceApi } from '../../../store/services/workspaceApi'
import AddMember from './AddMember'

const ROLE_MAP = {
  owner: 'Владелец',
  admin: 'Администратор',
  member: 'Участник'
}

const BOOLEAN_MAP = {
  true: 'Да',
  false: 'Нет'
}

const Members = ({ members }) => {
  const theme = useMantineTheme()
  const modals = useModals()
  const [removeMember, { data, error }] = useRemoveMemberMutation()
  const [isAddMemberModalOpened, setIsAddMemberModalOpened] = useState(false)
  const dispatch = useDispatch()

  const handleAddMemberModalToggle = () => {
    setIsAddMemberModalOpened((prevState) => !prevState)
  }

  const openRemoveModal = (id) => modals.openConfirmModal({
    title: <Text size='lg' weight={700}>Удалить пользователя</Text>,
    centered: true,
    children: (
      <Text>Вы действительно хотите удалить?</Text>
    ),
    labels: { confirm: 'Да', cancel: 'Нет' },
    confirmProps: { color: 'red' },
    onConfirm: () => {
      removeMember(id)
    }
  })

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
      <Title order={2} sx={{
        marginTop: theme.spacing.xl,
        color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
        marginRight: theme.spacing.xs
      }}>
        Участники рабочего пространства
      </Title>
      <Table fontSize='md' mb='sm' striped highlightOnHover>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Почта</th>
            <th>Роль</th>
            <th>Может добавлять кандидатов</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{members.map(({
          id,
          name,
          email,
          role,
          canAddCandidate
        }, index) => {
          return (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{ROLE_MAP[role]}</td>
              <td>{BOOLEAN_MAP[canAddCandidate]}</td>
              <td>
                <Menu>
                  <Menu.Item icon={<Edit size={14} />}>Изменить</Menu.Item>
                  <Menu.Item color='red' icon={<Trash size={14} />} onClick={() => openRemoveModal(id)}>Удалить</Menu.Item>
                </Menu>
              </td>
            </tr>
          )
        })}</tbody>
      </Table>
      <AddMember isOpened={isAddMemberModalOpened} onClose={handleAddMemberModalToggle} />
      <Button variant='light' onClick={handleAddMemberModalToggle}>Добавить участника</Button>
    </Fragment>
  )
}

export default Members