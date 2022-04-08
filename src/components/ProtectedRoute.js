import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import cookie from 'js-cookie'

const ProtectedRoute = () => {
  const user = cookie.get('user')

  return (
    user ? (
      <Outlet />
    ) : (
      <Navigate to='/sign-in' />
    )
  )
}

export default ProtectedRoute