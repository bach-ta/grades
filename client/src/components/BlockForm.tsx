import * as React from 'react'
import { FC, useState } from 'react'
import { Dialog, DialogTitle, TextField, Button } from '@mui/material'

interface Props {
  isOpen: boolean;
	handleClose: () => void;
}

const BlockForm: FC<Props> = ({ isOpen, handleClose /* addBlock */ }) => {
  const [blockName, setBlockName] = useState('')
  const [blockWeight, setWeight] = useState('')
  const [blockCount, setCount] = useState(0)

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Add a Block</DialogTitle>
      <TextField
        label="Block"
        variant="outlined"
        type="text"
        value={blockName}
        onChange={(event) => {
          setBlockName(event.target.value)
        }}
      />
      <TextField
        label="Weight"
        variant="outlined"
        type="number"
        value={blockWeight}
        onChange={(event) => {
          setWeight(event.target.value)
        }}
      />
      <TextField
        label="Number of entries"
        variant="outlined"
        type="number"
        value={blockCount}
        onChange={(event) => {
          setCount(parseInt(event.target.value))
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          // addBlock({
          //   name: blockName,
          //   blockWeight: blockWeight,
          //   blockCount: blockCount,
          //   entries: new Array(blockCount).fill(''),
          // })
        }}
      >
        Add
      </Button>
    </Dialog>
  )
}

export default BlockForm
