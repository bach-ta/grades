import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useParams } from 'react-router-dom'
import { deleteTerm } from '../controllers/termController'
import { addCourse } from '../controllers/courseController'
import { setCourses } from '../reducers/courses'
import axios from 'axios'

const Term = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const termPk = parseInt(params.termPk)

  const terms = useSelector(state => state.terms.value)
  const termName = terms.filter(term => {return term.term_pk === termPk})[0]?.term_name

  const [courseName, setCourseName] = useState("")
  
  return (
    <>
      <Typography>{termName}</Typography>
      <label>Add a course: </label>
      <input placeholder='e.g. MATH 239' type="text" value={courseName} onChange={event => {
        setCourseName(event.target.value)
      }}/>
      <button onClick={() => {
        addCourse(courseName, termPk)
        axios.get('http://localhost:3001/courses').then(res => {
          dispatch(setCourses(res.data))
        })
      }}>
        Add course
      </button>
      <IconButton onClick={() => { deleteTerm(termPk, termName) }}><DeleteIcon/></IconButton>
    </>
  )
}

export default Term