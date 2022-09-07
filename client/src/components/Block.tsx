import * as React from 'react'
import { FC, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import BlockController from '../controllers/blockController'

const blockController = new BlockController()

interface Props {
  block: {
    block_name: string
    block_pk: number
    block_weight: number
    course_fk: number
    entries: string
    block_average: number
  }
}

const Block: FC<Props> = ({ block }) => {
  const {
    block_name: blockName,
    block_pk: blockPk,
    block_weight: blockWeight,
    course_fk: courseFk,
    entries,
    block_average: blockAverage,
  } = block

  const dispatch = useDispatch()
  const [newEntry, setNewEntry] = useState<string>('')
  const entryArray = JSON.parse(entries)

  return (
    <Grid item xs={6}>
      <Card style={{ backgroundColor: '#313131' }} sx={{ m: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {blockName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Weight: {blockAverage} / {blockWeight}
          </Typography>
          {entryArray.map((entry, idx) => {
            return <Typography key={idx}>{entry}</Typography>
          })}
          <TextField
            label="Add a new entry"
            placeholder="100"
            type="text"
            value={newEntry}
            onChange={(event) => {
              setNewEntry(event.target.value)
            }}
          />
          <Button
            variant="contained"
            onClick={async () => {
              if (newEntry == '') return
              await blockController.updateEntries(
                [...entryArray, parseFloat(newEntry)],
                blockPk,
                courseFk,
                dispatch
              )
              setNewEntry('')
            }}
          >
            Add
          </Button>
          {/*  */}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Block
