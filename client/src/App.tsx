import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { fetchTerms } from './reducers/terms'
import { fetchCourses } from './reducers/courses'
import { fetchBlocks } from './reducers/blocks'
import { AppDispatch } from '.'
import AuthController from './controllers/authController'
import Views from './components/Views'
import { UserContext } from './contexts/UserContext'
import { ThemeProvider } from '@emotion/react'
import { theme } from './components/MUI/Theme'
import { CssBaseline } from '@mui/material'

const authController = new AuthController()

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<{ loggedIn: boolean | undefined }>({
    loggedIn: undefined,
  })

  useEffect(() => {
    onLoad()
  }, [])

  const onLoad = async () => {
    try {
      await authController.getCurrentUser()
      setUser({ loggedIn: true })
    } catch (err) {
      console.log(err)
      setUser({ loggedIn: false })
    }
  }

  useEffect(() => {
    if (user.loggedIn) {
      dispatch(fetchTerms())
      dispatch(fetchCourses())
      dispatch(fetchBlocks())
    }
  }, [user, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={[user, setUser]}>
        {user.loggedIn !== undefined && <Views />}
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
