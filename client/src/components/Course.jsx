import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Course = ({courseID}) => {
  const [courseInfo, setCourseInfo] = useState({id: 1, name: "", courses: "[]"})
  const [termCourses, setTermCourses] = useState([])
  const [courseName, setCourseName] = useState("")
  const [credit, setCredit] = useState(3)

  // useEffect(() => {
  //   axios.get('http://localhost:3001/courses').then(res => {
      
  //   })
  // })

  return (
    <div className='Course'>
      {courseID}
    </div>
  )
}

export default Course