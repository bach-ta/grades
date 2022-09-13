// SOURCE: https://github.com/mui/material-ui/blob/v5.10.1/docs/data/material/getting-started/templates/sign-in-side/SignInSide.tsx

import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

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
