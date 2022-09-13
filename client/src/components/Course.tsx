import * as React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import Block from './Block'
import BlockController from '../controllers/blockController'
import BlockForm from './BlockForm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
        <Grid container>
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
