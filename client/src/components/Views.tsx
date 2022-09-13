import * as React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import ProtectedRoutes from './ProtectedRoutes'
import Register from './Register'
import Term from './Term'
import { UserContext } from '../contexts/UserContext'

const Views: React.FC = () => {
  const isAuthenticated = React.useContext(UserContext)[0].loggedIn
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />}
        />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/*" element={<Home />} />
          <Route path="/terms/:termPk" element={<Term />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Views
