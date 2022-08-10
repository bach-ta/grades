import * as React from 'react'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
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

interface Props {
	coursePk: number;
}

const Course: FC<Props> = ({ coursePk }) => {
  const courses = useSelector((state: any) => state.courses)
  const courseName = courses.value.filter((course) => {
    return course.course_pk === coursePk
  })[0].course_name

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
          {/* {JSON.parse(blocks).map((block) => {
            return <p key={block.block_fk}>{block.block_name}</p>
          })} */}
        </CardContent>
        <BlockForm
          isOpen={isOpen}
          handleClose={toggleOpen}
          // addBlock={addBlock}
        />
      </Card>
    </Grid>
  )
}

export default Course
