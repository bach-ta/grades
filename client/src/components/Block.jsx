import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const Block = ({blockID}) => {
  const dispatch = useDispatch()
  const blockInfo = useSelector(state => state.blocks?.value.filter(val => {return val.id === blockID})[0])

  return (
    <div>{blockID} {blockInfo?.name}</div>
  )
}

export default Block