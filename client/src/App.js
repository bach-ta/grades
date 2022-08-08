import React, { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Home from './components/Home'
import Term from './components/Term'
import { fetchTerms } from './reducers/terms'
import TermController from './controllers/termController'
import CourseController from './controllers/courseController'
import './App.css'

const termController = new TermController()
const courseController = new CourseController()

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTerms())
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/terms/:termPk" element={<Term />} />
      </Routes>
    </Router>
  )
}

export default App
