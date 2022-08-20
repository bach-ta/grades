import * as React from 'react'
import { FC } from 'react'
import AuthController from '../controllers/authController'
import SignInSide from './MUI/SignInSide'

const authController = new AuthController()

const Login: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const rememberMe = !!data.get('remember')
  }

  return <SignInSide handleSubmit={handleSubmit} />
}

export default Login
