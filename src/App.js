import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import AppLayout from './AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import CreateWorkspace from './pages/Workspace/CreateWorkspace'
import Settings from './pages/Settings/Settings'
import Test from './Test'

const App = () => {
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Nunito Sans, sans-serif' }}>
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/create-workspace' element={<ProtectedRoute />}>
                <Route path='/create-workspace' element={<CreateWorkspace />} />
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
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
