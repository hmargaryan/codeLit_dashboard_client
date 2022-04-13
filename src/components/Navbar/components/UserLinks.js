import React, { Fragment } from 'react'
import { Divider, Menu } from '@mantine/core';
import { Link } from 'react-router-dom'
import { User, Database, Palette, Logout } from 'tabler-icons-react';

const links = [
  { path: '/settings?tab=profile', icon: <User size={14} />, label: 'Профиль' },
  { path: '/settings?tab=workspace', icon: <Database size={14} />, label: 'Рабочее пространство' },
  { path: '/settings?tab=branding', icon: <Palette size={14} />, label: 'Брендинг' }
]

const UserLinks = () => {
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
      <Menu.Item color='red' icon={<Logout size={14} />}>Выйти</Menu.Item>
    </Fragment>
  )
}

export default UserLinks