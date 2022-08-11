import * as React from 'react'
import { FC, useState } from 'react'
import axios from 'axios'

const Login: FC = () => {
  return (
    <button
      onClick={() => {
        axios
          .post('http://localhost:3001/auth/register', {
            userEmail: 'test3@test.com',
            username: 'test3',
            password: 'testpw3',
          })
          .then((res) => {
            console.log(res)
          })
      }}
    >
      Login
    </button>
  )
}

export default Login
