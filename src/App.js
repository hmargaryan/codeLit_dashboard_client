import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import AppLayout from './AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import CreateWorkspace from './pages/Workspace/CreateWorkspace'
import Test from './Test'

const SIGN_IN = '/sign-in'
const SIGN_UP = '/sign-up'
const CREATE_WORKSPACE = '/create-workspace'
const SIGN_PAGES = [SIGN_IN, SIGN_UP, CREATE_WORKSPACE]

const App = () => {
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Nunito Sans, sans-serif' }}>
        <BrowserRouter>
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/create-workspace' element={<ProtectedRoute />}>
              <Route path='/create-workspace' element={<CreateWorkspace />} />
            </Route>
            <Route path='/' element={<AppLayout />}>
              <Route path='/test' element={<ProtectedRoute />}>
                <Route path='/test' element={<Test />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
