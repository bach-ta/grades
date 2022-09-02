import * as React from 'react'
import { FC, useState } from 'react'
import { Card, CardContent, Typography, TextField, Button } from '@mui/material'
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
    block_name,
    block_pk,
    block_weight,
    course_fk,
    entries,
    block_average,
  } = block

  const dispatch = useDispatch()
  const [newEntry, setNewEntry] = useState<string>('')
  const entryArray = JSON.parse(entries)

  return (
    <Card style={{ backgroundColor: 'white' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {block_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Weight: {block_average} / {block_weight}
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
          onClick={() => {
            if (newEntry == '') return
            blockController.updateEntries(
              [...entryArray, parseFloat(newEntry)],
              block_pk,
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
  )
}

export default Block
