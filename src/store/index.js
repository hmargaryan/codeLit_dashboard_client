import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './services/userApi'
// import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    // auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})