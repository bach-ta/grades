import * as React from 'react'
import AuthController from '../controllers/authController'
import { FC } from 'react'
import SignUp from './MUI/SignUp'

const authController = new AuthController()

const Register: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const params = {
      // ! since TextFields are required
      userEmail: data.get('email')!.toString(),
      password: data.get('password')!.toString(),
    }
    authController.registerUser(params)
  }

  return <SignUp handleSubmit={handleSubmit} />
}

export default Register
