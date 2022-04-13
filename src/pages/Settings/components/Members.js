import React, { Fragment, useState } from 'react'
import { Title, Table, Button, Menu, useMantineTheme } from '@mantine/core'
import { Edit, Trash } from 'tabler-icons-react'
import AddMember from './AddMember'


const ROLE_MAP = {
  owner: 'Владелец',
  admin: 'Админ',
  member: 'Участник'
}

const BOOLEAN_MAP = {
  true: 'Да',
  false: 'Нет'
}

const Members = ({ members }) => {
  const theme = useMantineTheme()
  const [isAddMemberModalOpened, setIsAddMemberModalOpened] = useState(false)

  const handleAddMemberModalToggle = () => {
    setIsAddMemberModalOpened((prevState) => !prevState)
  }

  return (
    <Fragment>
      <Title order={2} sx={{ marginTop: theme.spacing.xl }}>Участники рабочего пространства</Title>
      <Table fontSize='md' mb='sm'>
        <thead>
          <tr>
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
        }) => {
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{ROLE_MAP[role]}</td>
              <td>{BOOLEAN_MAP[canAddCandidate]}</td>
              <td>
                <Menu>
                  <Menu.Item icon={<Edit size={14} />}>Изменить</Menu.Item>
                  <Menu.Item color='red' icon={<Trash size={14} />}>Удалить</Menu.Item>
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