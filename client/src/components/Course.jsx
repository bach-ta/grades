import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material'

const Course = ({courseID}) => {
  const courseInfo = useSelector(state => state.courses.value.filter(val => {return val.id === courseID})[0])
  return (
    <Grid item xs={12}>
      <Card style={{backgroundColor: '#c5cae9'}}>
        <CardContent>
          <Typography> {courseInfo ? courseInfo.name : ""} </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Course