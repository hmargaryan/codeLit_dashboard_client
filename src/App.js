import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals';
import AppLayout from './AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import CreateWorkspace from './pages/CreateWorkspace/CreateWorkspace'
import ChooseWorkspace from './pages/ChooseWorkspace/ChooseWorkspace'
import Settings from './pages/Settings/Settings'
import Test from './Test'

const App = () => {
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Nunito Sans, sans-serif' }}>
        <ModalsProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/create-workspace' element={<ProtectedRoute />}>
                  <Route path='/create-workspace' element={<CreateWorkspace />} />
                </Route>
                <Route path='/choose-workspace' element={<ProtectedRoute />}>
                  <Route path='/choose-workspace' element={<ChooseWorkspace />} />
                </Route>
                <Route path='/' element={<ProtectedRoute />}>
                  <Route path='/' element={<AppLayout />}>
                    <Route path='/test' element={<ProtectedRoute />}>
                      <Route path='/test' element={<Test />} />
                    </Route>
                    <Route path='/settings' element={<ProtectedRoute />}>
                      <Route path='/settings' element={<Settings />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
