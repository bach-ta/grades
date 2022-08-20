import * as React from 'react'
import { FC, useState } from 'react'
import axios from 'axios'
import AuthController from '../controllers/authController'

const authController = new AuthController()

const Login: FC = () => {
  return (
    <button
      onClick={() => {
        authController.registerUser({
          userEmail: 'test3@test.com',
          username: 'test3',
          password: 'testpw3',
        })
      }}
    >
      Login
    </button>
  )
}

export default Login
