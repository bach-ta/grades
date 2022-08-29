import * as React from 'react'
import { createContext } from 'react'

export type User = {
  loggedIn: boolean
}

type UserContext = [User, React.Dispatch<React.SetStateAction<User>>]

export const UserContext = createContext<UserContext>([
  { loggedIn: false },
  () => null,
])
// export const UserContext = createContext<UserContext | undefined>(undefined)
