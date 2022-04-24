import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTerms } from '../reducers/terms'
import { setCourses } from '../reducers/courses'
import Course from './Course'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'

const Term = ( {termID, expanded} ) => {
  const [courseName, setCourseName] = useState("")
  const [credit, setCredit] = useState(3)
  const dispatch = useDispatch()

  const terms = useSelector(state => state.terms.value)
  const termInfo = terms.filter(val => {return val.id === termID})[0]
  
  const postCourse = () => {
    if (courseName === "") return
    axios.post('http://localhost:3001/courses/add', {
      courseName: courseName,
      credit: credit
    }).then(() => {
      console.log(`add course ${courseName} successfully`)
      axios.get('http://localhost:3001/courses').then(res => {
        dispatch(setCourses(res.data))
        const newCourseList = [...JSON.parse(termInfo.courses), res.data.slice(-1)[0].id]
        axios.put(`http://localhost:3001/terms/update_courses`, {
          newCourseList: JSON.stringify(newCourseList),
          termID: termID
        }).then( () => axios.get('http://localhost:3001/terms').then(res => { const data = res.data; dispatch(setTerms(data)) }) )
      })
      setCourseName("")
      setCredit(3)
    })
  }
  

  const deleteTerm = () => {
    console.log(termID)
    axios.delete(`http://localhost:3001/terms/delete/${termID}`).then(res => {
      dispatch(setTerms(terms.filter(val => val.id != termID )))
      // dispatch children of terms as well
    })
  }

  return (
    <Accordion defaultExpanded={expanded} style={{backgroundColor: '#7986cb'}} sx={{m: 2}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{termInfo.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {(JSON.parse(termInfo.courses)).map((val, key) => { return <Course courseID={val} key={key}/> })}
        </Grid>
        <label>Add a course: </label>
        <input placeholder='e.g. MATH 239' type="text" value={courseName} onChange={(event) => {
          setCourseName(event.target.value)
        }}/>
        <input placeholder='Credit, e.g. 3' type="number" value={credit} onChange={(event) => {
          setCredit(event.target.value)
        }}/>
        <button onClick={postCourse}>
          Add course
        </button>
        <IconButton onClick={deleteTerm}>
          <DeleteIcon/>
        </IconButton>
      </AccordionDetails>
    </Accordion>
  )
}

export default Term