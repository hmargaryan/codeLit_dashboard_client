import { createSlice } from '@reduxjs/toolkit'
import cookie from 'js-cookie'

const initialState = {
  token: cookie.getJSON('token') || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})

export const { setToken } = authSlice.actions

export default authSlice.reducer