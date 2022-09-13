import * as React from 'react'
import { FC, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import BlockController from '../controllers/blockController'
import EntryTable from './EntryTable'

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
          <Typography color="text.secondary">
            Weight: {blockAverage || 'N/A'} / {blockWeight}
          </Typography>
          <EntryTable blockName={blockName} entries={entryArray} />

          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              hiddenLabel
              placeholder="Add a new entry"
              type="text"
              variant="filled"
              size="small"
              value={newEntry}
              onChange={(event) => {
                setNewEntry(event.target.value)
              }}
              sx={{ width: 7 / 10 }}
            />
            <Button
              variant="contained"
              sx={{ width: 2.5 / 10 }}
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Block
