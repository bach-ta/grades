import * as React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Course from './Course'
import CourseController from '../controllers/courseController'
import { Navigate } from 'react-router-dom'
import TermController from '../controllers/termController'

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
    console.log(`No term matches ID ${termPk}`)
    return <Navigate to="/" replace />
  }

  const { term_name: termName, term_average: termAverage } = term

  return (
    <Container maxWidth="lg" sx={{ my: 4, width: 4 / 5 }}>
      <Typography variant="h5">{termName}</Typography>

      <Typography>Term GPA: {termAverage || 'N/A'}</Typography>
      <br />
      {!courses[0] ? (
        <Typography sx={{ fontStyle: 'italic' }}>
          No courses recorded
        </Typography>
      ) : (
        <>
          {courses.map((course) => {
            return <Course key={course.course_pk} coursePk={course.course_pk} />
          })}
        </>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 5,
        }}
      >
        <Box
          component="form"
          onSubmit={() => {
            courseController.addCourse(courseName, termPk, dispatch)
            setCourseName('')
          }}
          sx={{
            width: 3 / 10,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <TextField
            hiddenLabel
            placeholder="Add a course"
            type="text"
            variant="filled"
            size="small"
            value={courseName}
            onChange={(event) => {
              setCourseName(event.target.value)
            }}
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            if (termController.deleteTerm(termPk, termName, dispatch))
              navigate('/')
          }}
        >
          Delete term
        </Button>
      </Box>
    </Container>
  )
}

export default Term
