import * as React from 'react'
import { FC } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

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
      </CardContent>
    </Card>
  )
}

export default Block
