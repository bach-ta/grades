import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Course from './Course'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Term = ( {termID} ) => {
  const [termInfo, setTermInfo] = useState({id: termID, name: "", courses: "[]"})
  const [courseName, setCourseName] = useState("")
  const [credit, setCredit] = useState(3)

  useEffect(() => {
    let TI = {}
    axios.get('http://localhost:3001/terms').then(res => {
      TI = res.data.filter(val => {return val.id === termID})[0]
      setTermInfo(TI)
    })
  }, [])
  
  const addCourse = () => {
    if (courseName === "") return
    axios.post('http://localhost:3001/addcourse', {
      courseName: courseName,
      credit: credit
    }).then(() => {
      console.log(`add course ${courseName} successfully`)
      axios.get('http://localhost:3001/courses').then(res => {
        const newCourseList = [...JSON.parse(termInfo.courses), res.data.slice(-1)[0].id]
        axios.put(`http://localhost:3001/update_course_list`, {
          newCourseList: JSON.stringify(newCourseList),
          termID: termID
        }).then(() => setTermInfo({id: termID, name: termInfo.name, courses: JSON.stringify(newCourseList)}))
      })
      
    })
  }

  return (
    <div className='Term'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{termInfo.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(JSON.parse(termInfo.courses)).map((val, key) => { return <Course courseID={val} key={key}/> })}
          <label>Add a course: </label>
          <input placeholder='e.g. MATH 239' type="text" required="required" onChange={(event) => {
            setCourseName(event.target.value)
          }}/>
          <input placeholder='Credit, e.g. 3' type="number" required="required" onChange={(event) => {
            setCredit(event.target.value)
          }}/>
          <button onClick={addCourse}>
            Add course
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Term