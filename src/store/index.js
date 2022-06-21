import { configureStore } from '@reduxjs/toolkit'

import { candidateApi } from './services/candidateApi'
import { interviewApi } from './services/interviewApi'
import { taskApi } from './services/taskApi'
import { templateApi } from './services/templateApi'
import { userApi } from './services/userApi'
import { workspaceApi } from './services/workspaceApi'
import { workspaceMemberApi } from './services/workspaceMemberApi'
// import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [workspaceMemberApi.reducerPath]: workspaceMemberApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [candidateApi.reducerPath]: candidateApi.reducer,
    [interviewApi.reducerPath]: interviewApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      userApi.middleware,
      workspaceApi.middleware,
      workspaceMemberApi.middleware,
      taskApi.middleware,
      templateApi.middleware,
      candidateApi.middleware,
      interviewApi.middleware
  )
})
