import * as React from 'react'
import { FC, useState } from 'react'
import { Dialog, DialogTitle, TextField, Button } from '@mui/material'
import { BlockParams1 } from './types'

interface Props {
  isOpen: boolean
  handleClose: () => void
  addBlock: (params: BlockParams1) => boolean
}

const BlockForm: FC<Props> = ({ isOpen, handleClose, addBlock }) => {
  const [blockName, setBlockName] = useState('')
  const [blockWeight, setWeight] = useState(0)
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
          setWeight(parseInt(event.target.value))
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
          const addResult = addBlock({
            blockName: blockName,
            blockWeight: blockWeight,
            blockCount: blockCount,
            entries: JSON.stringify(new Array(blockCount).fill('')),
          })
          if (addResult) {
            setBlockName('')
            setWeight(0)
            setCount(0)
            handleClose()
          }
        }}
      >
        Add
      </Button>
    </Dialog>
  )
}

export default BlockForm
