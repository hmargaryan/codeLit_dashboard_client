import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './services/userApi'
import { workspaceApi } from './services/workspaceApi'
import { workspaceMemberApi } from './services/workspaceMemberApi'
import { taskApi } from './services/taskApi'
// import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [workspaceMemberApi.reducerPath]: workspaceMemberApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, workspaceApi.middleware, workspaceMemberApi.middleware, taskApi.middleware)
})