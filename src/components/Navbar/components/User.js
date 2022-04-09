import React, { Fragment } from 'react'
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  Divider,
  Menu
} from '@mantine/core'
import { ChevronRight } from 'tabler-icons-react'
import UserLinks from './UserLinks'

const User = () => {
  return (
    <Fragment>
      <Divider size='xs' my='sm' />
      <Menu
        sx={{ width: '100%' }}
        withArrow
        position='right'
        control={
          <UnstyledButton
            sx={(theme) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.md,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            })}>
            <Group>
              <Avatar
                src='https://avatars.githubusercontent.com/u/31266320?s=48&v=4'
                radius='xl'
                alt='Фотка профиля' />
              <Box sx={{ flex: 1 }}>
                <Text size='sm' weight={500}>
                  Hamlet Margaryan
                </Text>
                <Text color='dimmed' size='xs'>
                  hamlet@gmail.com
                </Text>
              </Box>
              <ChevronRight size={18} />
            </Group>
          </UnstyledButton>
        }>
        <UserLinks />
      </Menu>
    </Fragment>
  )
}

export default User