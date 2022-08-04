import React, { useState } from 'react'
import { Dialog, DialogTitle, TextField, Button } from '@mui/material'

const BlockForm = ({handleClose, isOpen, postBlock}) => {
  const [blockName, setBlockName] = useState("")
  const [weight, setWeight] = useState("")
  const [count, setCount] = useState(0)


  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Add a Block</DialogTitle>
      <TextField label="Block" variant="outlined" type="text" value={blockName} onChange={event => {
        setBlockName(event.target.value)
      }}/>
      <TextField label="Weight" variant="outlined" type="number" value={weight} onChange={event => {
        setWeight(event.target.value)
      }}/>
      <TextField label="Number of entries" variant="outlined" type="number" value={count} onChange={event => {
        setCount(event.target.value)
      }}/>
      <Button variant="contained" onClick={() => {postBlock({
        name: blockName,
        weight: weight,
        count: count,
        entries: new Array(count).fill("")
      })}}>
        Add
      </Button>
    </Dialog>
  )
}

export default BlockForm