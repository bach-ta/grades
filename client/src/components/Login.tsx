import * as React from 'react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthController from '../controllers/authController'
import SignInSide from './MUI/SignInSide'

const authController = new AuthController()

const Login: FC = () => {
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const rememberMe = !!data.get('remember')

    authController
      .loginUser({
        // ! since TextFields are required
        userEmail: data.get('email')!.toString(),
        password: data.get('password')!.toString(),
      })
      .then(() => {
        // #3 TODO: using .then(navigate) does not show loading tab icon
        navigate('/')
      })
      .catch(() => {
        // #3 TODO: handle unsuccessful login attempts
      })
  }

  return <SignInSide handleSubmit={handleSubmit} />
}

export default Login
