import React from 'react'
import { AppShell, Container } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header'

const AppLayout = () => {
  return (
    <AppShell
      padding='md'
      navbar={<Navbar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}>
        <Container size={1220}>
            <Outlet />
        </Container>
    </AppShell>
  )
}

export default AppLayout
