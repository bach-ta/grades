import * as React from 'react'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Term from './components/Term'
import Login from './components/Login'
import Register from './components/Register'
import { fetchTerms } from './reducers/terms'
import { fetchCourses } from './reducers/courses'
import { fetchBlocks } from './reducers/blocks'
import './App.css'
import { AppDispatch } from '.'

const getCurrentUser = () => {}

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  // #3 TODO: accessing homepage but not authenticated -> redirect to login
  //          accessing login but already authenticated -> redirect to home

  // #3 TODO: Fix bug: data are fetched before user login -> 400,
  //          then user is redirected to home page and the 400 error is still showing,
  //          so user needs to refresh to fetch data again

  useEffect(() => {
    dispatch(fetchTerms())
    dispatch(fetchCourses())
    dispatch(fetchBlocks())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* #3 to be updated */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms/:termPk" element={<Term />} />
      </Routes>
    </Router>
  )
}

export default App
