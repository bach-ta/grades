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

interface Props {
  coursePk: number
}

const blockController = new BlockController()

const Course: FC<Props> = ({ coursePk }) => {
  const dispatch = useDispatch()
  const courses = useSelector((state: any) => state.courses)
  const courseName = courses.value.filter((course) => {
    return course.course_pk === coursePk
  })[0].course_name

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
      <Card style={{ backgroundColor: '#c5cae9' }}>
        <CardContent>
          <Typography> {courseName} </Typography>
          <Tooltip title="Add a Block">
            <IconButton onClick={toggleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          {blocks.map((block) => {
            return <p key={block.block_fk}>{block.block_name}</p>
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
