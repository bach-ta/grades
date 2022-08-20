import * as React from 'react'
import { FC, useState } from 'react'
import axios from 'axios'
import AuthController from '../controllers/authController'
import SignInSide from './MUI/SignInSide'

const authController = new AuthController()

const Login: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })

    authController.registerUser({
      userEmail: 'test3@test.com',
      username: 'test3',
      password: 'testpw3',
    })
  }

  return <SignInSide handleSubmit={handleSubmit} />
}

export default Login
