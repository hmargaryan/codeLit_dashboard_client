import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, ColorSchemeProvider, AppShell } from '@mantine/core'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Test from './Test'

const SIGN_IN = '/sign-in'
const SIGN_UP = '/sign-up'
const SIGN_PAGES = [SIGN_IN, SIGN_UP]

const App = () => {
  const [isSignPage, setIsSignPage] = useState()
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    setIsSignPage(SIGN_PAGES.includes(window.location.pathname))
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Nunito Sans, sans-serif' }}>
        <BrowserRouter>
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
          </Routes>
          {!isSignPage && (
            <AppShell
              padding='md'
              navbar={<Navbar />}
              header={<Header />}
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
    </ColorSchemeProvider>
  )
}

export default App
