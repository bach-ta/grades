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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
    <Accordion defaultExpanded={true} sx={{ my: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" sx={{ width: '20%', flexShrink: 0 }}>
          {courseName}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {courseAverage}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {blocks.map((block) => {
            return <Block key={block.block_pk} block={block} />
          })}
        </Grid>
        <Tooltip title="Add a Block">
          <IconButton onClick={toggleOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
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
      </AccordionDetails>
    </Accordion>
  )
}

export default Course
