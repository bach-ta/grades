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
  // const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  const terms = useSelector(state => state.terms.value)
  const termInfo = terms.filter(val => {return val.id === termID})[0]

  // const [termName, setTermName] = useState(termInfo.name)

  const postCourse = () => {
    if (!courseName) return
    axios.post('http://localhost:3001/courses/add', {
      courseName: courseName
    }).then(() => {
      console.log(`add course ${courseName} successfully`)
      axios.get('http://localhost:3001/courses').then(res => {
        dispatch(setCourses(res.data))
        const courseList = [...JSON.parse(termInfo.courses), res.data.slice(-1)[0].id]
        axios.put(`http://localhost:3001/terms/update`, {
          termName: termInfo.name,
          courseList: JSON.stringify(courseList),
          termID: termID
        }).then( () => axios.get('http://localhost:3001/terms').then(res => { dispatch(setTerms(res.data)) }) )
      })
      setCourseName("")
    })
  }
  

  const deleteTerm = () => {
    if (window.confirm(`Are you sure you want to remove ${termInfo.name} term?`)) {
      axios.delete(`http://localhost:3001/terms/delete/${termID}`).then(res => {
        dispatch(setTerms(terms.filter(val => val.id !== termID )))
        // dispatch children of terms as well
      })
    }
  }

  // const toggleEdit = (event) => {
  //   if (!editMode) setEditMode(true)
  //   else {
  //     if (event.key === 'Enter' || event.key === 'Escape') {
  //       setEditMode(false)
  //       event.preventDefault()
  //       event.stopPropagation()
  //       if (termName !== termInfo.name) { // if user made change
  //         axios.put(`http://localhost:3001/terms/update`, {
  //           termName: termName,
  //           courseList: termInfo.courses,
  //           termID: termID
  //         }).then( () => axios.get('http://localhost:3001/terms').then(res => { dispatch(setTerms(res.data)) }) )
  //       }
  //     }
  //   }
  // }

  return (
    <Accordion defaultExpanded={expanded} style={{backgroundColor: '#7986cb'}} sx={{m: 2}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {/* {editMode ? 
          <Input type="text" value={termName} onChange={event => { setTermName(event.target.value) }} onKeyDown={toggleEdit}/> :
          <Typography onDoubleClick={toggleEdit}>{termInfo.name}</Typography>
        } */}
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
        <input placeholder='e.g. MATH 239' type="text" value={courseName} onChange={event => {
          setCourseName(event.target.value)
        }}/>
        <button onClick={postCourse}>
          Add course
        </button>
        <IconButton onClick={deleteTerm}><DeleteIcon/></IconButton>
      </AccordionDetails>
    </Accordion>
  )
}

export default Term