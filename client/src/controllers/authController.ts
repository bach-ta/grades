import axios, { AxiosResponse } from 'axios'

axios.defaults.withCredentials = true

type AuthControllerParams = {
  userEmail: string
  password: string
}

export default class AuthController {
  registerUser = (params: AuthControllerParams): Promise<AxiosResponse> => {
    return axios.post('http://localhost:3001/auth/register', params)
  }

  loginUser = (params: AuthControllerParams): Promise<AxiosResponse> => {
    return axios.post('http://localhost:3001/auth/login', params)
  }
}
