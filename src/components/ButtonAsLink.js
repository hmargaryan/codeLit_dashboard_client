import React from 'react'
import { UnstyledButton } from '@mantine/core'


const ButtonAsLink = ({ text }) => {
  return (
    <UnstyledButton
      type='button'
      sx={(theme) => ({
        color: theme.colors.blue[6],

        '&:hover': {
          textDecoration: 'underline'
        },
      })}>
      {text}
    </UnstyledButton>
  )
}

export default ButtonAsLink