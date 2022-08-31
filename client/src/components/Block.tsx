import * as React from 'react'
import { FC, useState } from 'react'

interface Props {
  block: {
    block_name: string
    block_pk: number
    block_weight: number
    course_fk: number
  }
}

const Block: FC<Props> = ({ block }) => {
  const { block_name, block_pk, block_weight, course_fk } = block

  return (
    <div>
      {course_fk} {block_name}
    </div>
  )
}

export default Block
