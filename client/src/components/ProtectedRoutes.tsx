import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { FC } from 'react'
import ResponsiveAppBar from './MUI/ResponsiveNavBar'
import { UserContext } from '../contexts/UserContext'
import { useLocation } from 'react-router'

const ProtectedRoutes: FC = () => {
  const isAuthenticated = React.useContext(UserContext)[0].loggedIn
  const location = useLocation()
  return isAuthenticated ? (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default ProtectedRoutes
