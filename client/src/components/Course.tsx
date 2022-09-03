import * as React from 'react'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BlockForm from './BlockForm'
import BlockController from '../controllers/blockController'
import Block from './Block'

interface Props {
  coursePk: number
}

const blockController = new BlockController()

const Course: FC<Props> = ({ coursePk }) => {
  const dispatch = useDispatch()
  const courses = useSelector((state: any) => state.courses)
  const course = courses.value.filter((course) => {
    return course.course_pk === coursePk
  })[0]
  const { course_name: courseName, course_average: courseAverage } = course

  const blocks = useSelector((state: any) => state.blocks.value).filter(
    (block) => {
      return block.course_fk === coursePk
    }
  )

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Grid item xs={12}>
      <Card style={{ backgroundColor: '#c5cae9' }} sx={{ m: 2 }}>
        <CardContent>
          <Typography> {courseName} </Typography>
          <Typography> {courseAverage} </Typography>
          <Tooltip title="Add a Block">
            <IconButton onClick={toggleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          {blocks.map((block) => {
            return <Block key={block.block_pk} block={block} />
          })}
        </CardContent>
        <BlockForm
          isOpen={isOpen}
          handleClose={toggleOpen}
          addBlock={(params) => {
            return blockController.addBlock(
              {
                ...params,
                courseFk: coursePk,
              },
              dispatch
            )
          }}
        />
      </Card>
    </Grid>
  )
}

export default Course
