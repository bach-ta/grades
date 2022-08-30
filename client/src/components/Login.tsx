import * as React from 'react'
import { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import AuthController from '../controllers/authController'
import SignInSide from './MUI/SignInSide'

const authController = new AuthController()

interface LocationState {
  state: {
    from: {
      pathname: string
      search: string
    }
  }
}

const Login: FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation() as LocationState
  const setUser = React.useContext(UserContext)[1]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const rememberMe = !!data.get('remember') // #17 TODO: implement rememberMe

    authController
      .loginUser({
        // ! since TextFields are required
        userEmail: data.get('email')!.toString(),
        password: data.get('password')!.toString(),
      })
      .then(() => {
        // #17 TODO: show loading page/tab icon, then move all these then/catch logics to authController
        setUser({ loggedIn: true })
        navigate(state.from ? state.from : '/')
      })
      .catch((err) => {
        // #17 TODO: handle unsuccessful login attempts
        alert(err)
      })
  }

  return <SignInSide handleSubmit={handleSubmit} />
}

export default Login
