import React, {useEffect, FC} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Home from './components/Home'
import Term from './components/Term'
import { setTerms } from './reducers/terms'
import { setCourses } from './reducers/courses'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3001/terms').then(res => { dispatch(setTerms(res.data)) }).then(() => {
      axios.get('http://localhost:3001/courses').then(res => { dispatch(setCourses(res.data)) })
    })
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route path="/terms/:termID" element={<Term/>} />
      </Routes>
    </Router>
  )
}

export default App

