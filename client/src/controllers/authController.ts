import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '..'

type RegisterParams = {
  userEmail: string
  password: string
}

export default class AuthController {
  registerUser = (params: RegisterParams): void => {
    axios.post('http://localhost:3001/auth/register', params).then((res) => {
      console.log(res)
    })
  }
}
