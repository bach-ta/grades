import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Course = ({courseID}) => {
  const courseInfo = useSelector(state => state.courses.value.filter(val => {return val.id === courseID})[0])

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => { setIsOpen(!isOpen) }

  return (
    <>
      {courseInfo ? (JSON.parse(courseInfo.blockFks)).map((blockFk, key) => { return <p>{blockFk}</p> }) : ""}
    </>
  )
}

export default Course