import React, { useState } from 'react'

import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Candidate from './pages/Candidate/Candidate'
import Candidates from './pages/Candidates/Candidates'
import ChooseWorkspace from './pages/ChooseWorkspace/ChooseWorkspace'
import CreateTemplate from './pages/CreateTemplate/CreateTemplate'
import CreateWorkspace from './pages/CreateWorkspace/CreateWorkspace'
import Room from './pages/Room/Room'
import Settings from './pages/Settings/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Tasks from './pages/Tasks/Tasks'
import Templates from './pages/Templates/Templates'

const App = () => {
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
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
                <Route path='/room/:id' element={<Room />} />
                <Route path='/' element={<ProtectedRoute />}>
                  <Route path='/' element={<AppLayout />}>
                    <Route path='/tasks' element={<ProtectedRoute />}>
                      <Route path='/tasks' element={<Tasks />} />
                    </Route>
                    <Route path='/templates' element={<ProtectedRoute />}>
                      <Route path='/templates' element={<Templates />} />
                    </Route>
                    <Route path='/' element={<ProtectedRoute />}>
                      <Route path='/' element={<Candidates />} />
                    </Route>
                    <Route path='/candidate/:id' element={<ProtectedRoute />}>
                      <Route path='/candidate/:id' element={<Candidate />} />
                    </Route>
                    <Route path='/create-template' element={<ProtectedRoute />}>
                      <Route path='/create-template' element={<CreateTemplate />} />
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

// TODO: Put back in MantineProvider theme prop (fontFamily: 'Nunito Sans, sans-serif')
