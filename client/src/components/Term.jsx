import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useParams, useNavigate } from 'react-router-dom'
import TermController from '../controllers/termController'
import CourseController from '../controllers/courseController'
import { setTerms } from '../reducers/terms'
import { setCourses } from '../reducers/courses'

const termController = new TermController()
const courseController = new CourseController()

const Term = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const termPk = parseInt(params.termPk)

  const terms = useSelector((state) => state.terms)
  const courses = useSelector((state) => state.courses.value).filter(
    (course) => {
      return course.term_fk === termPk
    }
  )

  const [courseName, setCourseName] = useState('')

  if (terms.status != 'succeeded') {
    return <p>{terms.status}</p>
  }

  const termName = terms.value.filter((term) => {
    return term.term_pk === termPk
  })[0]?.term_name

  if (!termName) {
    return <p>{`No term matches ID ${termPk}`}</p>
  }

  return (
    <>
      <Typography>{termName}</Typography>
      <label>Add a course: </label>
      <input
        placeholder="e.g. MATH 239"
        type="text"
        value={courseName}
        onChange={(event) => {
          setCourseName(event.target.value)
        }}
      />
      <button
        onClick={() => {
          courseController.addCourse(courseName, termPk).then(() => {
            courseController.getCourses().then((res) => {
              dispatch(setCourses(res.data))
            })
          })
        }}
      >
        Add course
      </button>
      <IconButton
        onClick={() => {
          // TODO
          termController
            .deleteTerm(termPk, termName)
            ?.then(() => {
              termController.getTerms().then((res) => {
                dispatch(setTerms(res.data))
              })
            })
            .then(() => {
              navigate('/')
            })
        }}
      >
        <DeleteIcon />
      </IconButton>

      <ul>
        {courses.map((course) => {
          return <li key={course.course_pk}>{course.course_name}</li>
        })}
      </ul>
    </>
  )
}

export default Term
