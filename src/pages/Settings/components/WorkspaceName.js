import React, { Fragment } from 'react'
import { Title, Text, Box, useMantineTheme } from '@mantine/core'
import ButtonAsLink from '../../../components/ButtonAsLink'

const Workspace = ({ name, slug }) => {
  const theme = useMantineTheme()

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 5 }}>
        <Title
          order={2}
          sx={{
            color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
            marginRight: theme.spacing.xs
          }}>
          {name}
        </Title>
        <Text color='dimmed'>{slug}</Text>
      </Box>
      <ButtonAsLink text='Изменить название' />
    </Fragment>
  )
}

export default Workspace