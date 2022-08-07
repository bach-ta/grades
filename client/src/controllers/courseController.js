import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCourses } from '../reducers/courses'
// const dispatch = useDispatch()

export const addCourse = (courseName, termFk) => {
  if (!courseName) {
    console.log("Error: courseName is empty")
    return
  }
  if (!termFk) {
    console.log("Error: termFk is empty")
    return
  }
  axios.post('http://localhost:3001/courses/add', {
    courseName: courseName,
    termFk: termFk
  }).then(() => {
    console.log(`add course ${courseName} successfully`)
  })
}