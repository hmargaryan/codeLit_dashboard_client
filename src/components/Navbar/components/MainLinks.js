import React from 'react'
import { Stack } from '@mantine/core'
import { Users, Template, MathSymbols } from 'tabler-icons-react'
import MainLink from './MainLink'

const links = [
  { path: '/', icon: <Users size={16} />, color: 'blue', label: 'Кандидаты' },
  { path: '/templates', icon: <Template size={16} />, color: 'teal', label: 'Шаблоны' },
  { path: '/tasks', icon: <MathSymbols size={16} />, color: 'violet', label: 'Задачи' }
]

const MainLinks = () => {
  return (
    <Stack>
      {links.map(({ path, icon, color, label }) => {
        return (
          <MainLink
            key={label}
            path={path}
            icon={icon}
            color={color}
            label={label} />
        )
      })}
    </Stack>
  )
}

export default MainLinks
