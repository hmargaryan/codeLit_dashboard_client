import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, AppShell, Header } from '@mantine/core'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar/Navbar'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Test from './Test'

const SIGN_IN = '/sign-in'
const SIGN_UP = '/sign-up'
const SIGN_PAGES = [SIGN_IN, SIGN_UP]

const App = () => {
  const [isSignPage, setIsSignPage] = useState()

  useEffect(() => {
    setIsSignPage(SIGN_PAGES.includes(window.location.pathname))
  }, [])

  return (
    <MantineProvider theme={{ fontFamily: 'Nunito Sans, sans-serif' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
        {!isSignPage && (
          <AppShell
            padding='md'
            navbar={<Navbar />}
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
            })}>
            <Routes>
              <Route path='/test' element={<ProtectedRoute />}>
                <Route path='/test' element={<Test />} />
              </Route>
            </Routes>
          </AppShell>
        )}
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
