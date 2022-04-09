import React from 'react'
import {
  Header as HeaderMantine,
  Text,
  ActionIcon,
  Group,
  useMantineColorScheme
} from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react'

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <HeaderMantine height={60}>
      <Group sx={{ height: '100%' }} px={20} position='apart'>
        <Text size='xl' color='dimmed'>BarCode</Text>
        <ActionIcon variant='default' onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </Group>
    </HeaderMantine>
  )
}

export default Header