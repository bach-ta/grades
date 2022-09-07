import * as React from 'react'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import TermController from '../controllers/termController'
import CourseController from '../controllers/courseController'
import Course from './Course'

const termController = new TermController()
const courseController = new CourseController()

const Term: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const termPk: number = parseInt(params.termPk ? params.termPk : '')

  const terms = useSelector((state: any) => state.terms)
  const courses = useSelector((state: any) => state.courses.value).filter(
    (course) => {
      return course.term_fk === termPk
    }
  )

  const [courseName, setCourseName] = useState('')

  if (terms.status !== 'succeeded') {
    return <p>{terms.status}</p>
  }

  const term = terms.value.filter((term) => {
    return term.term_pk === termPk
  })[0]

  if (!term) {
    return <p>{`No term matches ID ${termPk}`}</p>
  }

  const { term_name: termName, term_average: termAverage } = term

  return (
    <>
      <Typography variant="h5">{termName}</Typography>
      <Typography>Term GPA: {termAverage}</Typography>
      <IconButton
        onClick={() => {
          if (termController.deleteTerm(termPk, termName, dispatch))
            navigate('/')
        }}
      >
        <DeleteIcon />
      </IconButton>

      {courses.map((course) => {
        return <Course key={course.course_pk} coursePk={course.course_pk} />
      })}

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
          courseController.addCourse(courseName, termPk, dispatch)
          setCourseName('')
        }}
      >
        Add course
      </button>
    </>
  )
}

export default Term
