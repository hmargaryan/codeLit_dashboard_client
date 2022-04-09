import React, { Fragment } from 'react'
import { Divider, Menu } from '@mantine/core';
import { Link } from 'react-router-dom'
import { User, Database, Palette, Logout } from 'tabler-icons-react';

const links = [
  { path: '/profile', icon: <User size={14} />, label: 'Профиль' },
  { path: '/profile', icon: <Database size={14} />, label: 'Проекты' },
  { path: '/profile', icon: <Palette size={14} />, label: 'Брендинг' }
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