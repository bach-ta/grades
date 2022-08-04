import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Typography, Grid, Tooltip, IconButton } from '@mui/material'
import { setCourses } from '../reducers/courses'
import { setBlocks } from '../reducers/blocks'
import AddIcon from '@mui/icons-material/Add'
import Block from './Block'
import BlockForm from './BlockForm'

const Course = ({courseID}) => {
  const dispatch = useDispatch()
  const courseInfo = useSelector(state => state.courses.value.filter(val => {return val.id === courseID})[0])

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => { setIsOpen(!isOpen) }

  const postBlock = block => {
    if (block.name === "" || block.weight === "") {
      alert("Name and weight cannot be empty")
      return
    }
    if (block.count === 0) {
      alert("Number of entries must be a positive integer")
      return
    }
    axios.post('http://localhost:3001/blocks/add', {
      name: block.name,
      weight: block.weight,
      count: block.count,
      entries: JSON.stringify(block.entries)
    }).then(() => {
      console.log(`add block ${block.name} to course ${courseInfo.name} successfully`)
      axios.get('http://localhost:3001/blocks').then(res => {
        dispatch(setBlocks(res.data))
        const blockList = [...JSON.parse(courseInfo.blocks), res.data.slice(-1)[0].id]
        axios.put(`http://localhost:3001/courses/update`, {
          courseName: courseInfo.name,
          blockList: JSON.stringify(blockList),
          courseID: courseID
        }).then( () => axios.get('http://localhost:3001/courses').then(res => { dispatch(setCourses(res.data)) }) )
      })
    })
  }

  return (
    <Grid item xs={12}>
      <Card style={{backgroundColor: '#c5cae9'}}>
        <CardContent>
          <Typography> {courseInfo ? courseInfo.name : ""} </Typography>
          <Tooltip title="Add a Block">
            <IconButton onClick={toggleOpen}><AddIcon /></IconButton>
          </Tooltip>
          {courseInfo ? (JSON.parse(courseInfo.blocks)).map((val, key) => { return <Block blockID={val} key={key}/> }) : ""}
        </CardContent>
        <BlockForm isOpen={isOpen} handleClose={toggleOpen} postBlock={postBlock} />
      </Card>
    </Grid>
  )
}

export default Course