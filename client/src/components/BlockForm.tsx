import * as React from 'react'
import { Button, Dialog, DialogTitle, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { BlockParams1 } from './types'

interface Props {
  isOpen: boolean
  handleClose: () => void
  addBlock: (params: BlockParams1) => boolean
}

const BlockForm: FC<Props> = ({ isOpen, handleClose, addBlock }) => {
  const [blockName, setBlockName] = useState<string>('')
  const [blockWeight, setWeight] = useState<string>('')

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Add a Block</DialogTitle>
      <TextField
        label="Block Name"
        variant="standard"
        type="text"
        value={blockName}
        onChange={(event) => {
          setBlockName(event.target.value)
        }}
        sx={{ mb: 1, mx: 2 }}
      />
      <TextField
        label="Weight"
        variant="standard"
        type="number"
        value={blockWeight}
        InputProps={{
          inputProps: {
            max: 100,
            min: 0,
          },
        }}
        onChange={(event) => {
          setWeight(event.target.value)
        }}
        sx={{ mb: 1, mx: 2 }}
      />
      <Button
        variant="contained"
        onClick={() => {
          const addResult = addBlock({
            blockName: blockName,
            blockWeight: parseInt(blockWeight),
          })
          if (addResult) {
            setBlockName('')
            setWeight('')
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
