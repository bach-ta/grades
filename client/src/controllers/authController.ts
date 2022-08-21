import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '..'

type AuthControllerParams = {
  userEmail: string
  password: string
}

export default class AuthController {
  registerUser = (params: AuthControllerParams): void => {
    axios.post('http://localhost:3001/auth/register', params).then((res) => {
      console.log(res) // #3: TODO: remove
    })
  }

  loginUser = (params: AuthControllerParams): void => {
    axios.post('http://localhost:3001/auth/login', params).then((res) => {
      console.log(res) // #3: TODO: remove
    })
  }
}
