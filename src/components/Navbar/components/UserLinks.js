import React, { Fragment } from 'react'

import { Divider, Menu, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { User, Database, Palette, Logout, Businessplan } from 'tabler-icons-react'

import { workspaceApi } from '../../../store/services/workspaceApi'

const links = [
  { path: '/settings?tab=profile', icon: <User size={14} />, label: 'Профиль' },
  { path: '/settings?tab=workspace', icon: <Database size={14} />, label: 'Рабочее пространство' },
  { path: '/settings?tab=businessplan', icon: <Businessplan size={14} />, label: 'Тариф' }
  // { path: '/settings?tab=branding', icon: <Palette size={14} />, label: 'Брендинг' }
]

const UserLinks = () => {
  const modals = useModals()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const openLogoutModal = () => modals.openConfirmModal({
    title: <Text size='lg' weight={700}>Выход</Text>,
    centered: true,
    children: (
      <Text>Вы действительно хотите выйти?</Text>
    ),
    labels: { confirm: 'Да', cancel: 'Нет' },
    confirmProps: { color: 'red' },
    onConfirm: () => {
      cookie.remove('user')
      dispatch(workspaceApi.util.resetApiState())
      navigate('/sign-in')
    }
  })

  return (
    <Fragment>
      {links.map(({ path, icon, label }) => {
        return (
          <Menu.Item
            component={Link}
            to={path}
            key={label}
            icon={icon}>
            {label}
          </Menu.Item>
        )
      })}
      <Divider />
      <Menu.Item
        color='red'
        icon={<Logout size={14} />}
        onClick={openLogoutModal}>
        Выйти
      </Menu.Item>
    </Fragment>
  )
}

export default UserLinks
