import React from 'react'
import { Group, ThemeIcon, Text, UnstyledButton } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'

const MainLink = ({ path, icon, color, label }) => {
  const location = useLocation()

  return (
    <UnstyledButton component={Link} to={path} sx={(theme) => ({
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      backgroundColor: location.pathname === path && (
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      ),

      '&:hover': {
        backgroundColor:
          location.pathname !== path && (
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
          )
      },
    })}>
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>
        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

export default MainLink