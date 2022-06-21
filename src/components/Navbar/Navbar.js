import React from 'react'
import { Navbar as NavbarMantine } from '@mantine/core'
import MainLinks from './components/MainLinks'
import User from './components/User'

const Navbar = () => {
  return (
    <NavbarMantine width={{ base: 300}} p='xs'>
      <NavbarMantine.Section grow>
        <MainLinks />
      </NavbarMantine.Section>
      <NavbarMantine.Section>
        <User />
      </NavbarMantine.Section>
    </NavbarMantine>
  )
}

export default Navbar
