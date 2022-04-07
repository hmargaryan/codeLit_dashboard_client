import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, AppShell, Navbar, Header } from '@mantine/core'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'

const SIGN_IN = '/sign-in'
const SIGN_UP = '/sign-up'
const SIGN_PAGES = [SIGN_IN, SIGN_UP]

const App = () => {
  const [isSignPage, setIsSignPage] = useState()

  useEffect(() => {
    setIsSignPage(SIGN_PAGES.includes(window.location.pathname))
  }, [])

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
        {!isSignPage && (
          <AppShell
            padding='md'
            navbar={
              <Navbar width={{ base: 300 }} height={500} p='xs'>
                {/* Navbar content */}
              </Navbar>
            }
            header={
              <Header height={60} p='xs'>
                {/* Header content */}
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Routes>
              <Route path='/sign-in' element={<SignIn />} />
            </Routes>
          </AppShell>
        )}
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
