import React from 'react'
import { Tabs } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useFetchWorkspaceQuery,
  useFetchWorkspaceMembersQuery
} from '../../store/services/workspaceApi'
import WorkspaceName from './components/WorkspaceName'
import Members from './components/Members'

const TABS_MAP = {
  profile: 0,
  0: 'profile',
  workspace: 1,
  1: 'workspace',
  branding: 2,
  2: 'branding'
}

const Settings = () => {
  const searchParams = useLocation().search
  const tabParam = new URLSearchParams(searchParams).get('tab')
  const { data: workspace } = useFetchWorkspaceQuery()
  const { data: members } = useFetchWorkspaceMembersQuery()

  const navigate = useNavigate()

  const handleTabChange = (tabIndex) => {
    navigate(`/settings?tab=${TABS_MAP[tabIndex]}`)
  }

  return (
    <Tabs tabPadding='md' active={TABS_MAP[tabParam]} onTabChange={handleTabChange}>
      <Tabs.Tab label='Профиль'>Gallery tab content</Tabs.Tab>
      <Tabs.Tab label='Рабочее пространство'>
        {workspace && <WorkspaceName name={workspace.name} slug={workspace.slug} />}
        {members && <Members members={members} />}
      </Tabs.Tab>
      <Tabs.Tab label='Брендинг'>Settings tab content</Tabs.Tab>
    </Tabs>
  )
}

export default Settings