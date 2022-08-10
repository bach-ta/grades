import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { setCourses } from '../reducers/courses'

export default class CourseController {
  getCourses = (): Promise<AxiosResponse> => {
    return axios.get('http://localhost:3001/courses')
  }

  addCourse = (
    courseName: string,
    termFk: number,
    dispatch: Dispatch
  ): void => {
    if (!courseName) {
      console.log('Error: courseName is empty')
      return
    }
    if (!termFk) {
      console.log('Error: termFk is empty')
      return
    }
    axios
      .post('http://localhost:3001/courses/add', {
        courseName: courseName,
        termFk: termFk,
      })
      .then(() => {
        console.log(`add course ${courseName} successfully`)
        this.getCourses().then((res) => {
          dispatch(setCourses(res.data))
        })
      })
  }
}
