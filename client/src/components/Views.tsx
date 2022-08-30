import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Home from './Home'
import Term from './Term'
import Login from './Login'
import Register from './Register'
import ProtectedRoutes from './ProtectedRoutes'
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
