import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './services/userApi'
import { workspaceApi } from './services/workspaceApi'
// import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, workspaceApi.middleware)
})