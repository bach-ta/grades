import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// NOT USED

const Course = ({ coursePk }) => {
  const courseInfo = useSelector(
    (state) =>
      state.courses.value.filter((course) => {
        return course.course_pk === coursePk
      })[0]
  )

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {courseInfo
        ? JSON.parse(courseInfo.blockFks).map((blockFk) => {
            return <p key={blockFk}>{blockFk}</p>
          })
        : ''}
    </>
  )
}

export default Course
