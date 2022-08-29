import * as React from 'react'
import { FC } from 'react'
import { useLocation } from 'react-router'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const ProtectedRoutes: FC = () => {
  const isAuthenticated = React.useContext(UserContext)[0].loggedIn
  const location = useLocation()
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default ProtectedRoutes
