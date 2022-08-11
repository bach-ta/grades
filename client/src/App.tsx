import * as React from 'react'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Term from './components/Term'
import Login from './components/Login'
import { fetchTerms } from './reducers/terms'
import { fetchCourses } from './reducers/courses'
import { fetchBlocks } from './reducers/blocks'
import './App.css'
import { AppDispatch } from '.'

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()

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
        <Route path="/terms/:termPk" element={<Term />} />
      </Routes>
    </Router>
  )
}

export default App
