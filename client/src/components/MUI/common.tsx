import * as React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export interface AuthProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://bachta.me/">
        Bach Ta
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
