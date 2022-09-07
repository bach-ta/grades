import * as React from 'react'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TermController from '../controllers/termController'
import { experimentalStyled as styled } from '@mui/material/styles'
import { TextField, Button, Box, Paper, Grid, Typography } from '@mui/material'

const termController = new TermController()

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Home: FC = () => {
  const [termName, setTermName] = useState('')

  const dispatch = useDispatch()
  const terms = useSelector((state: any) => state.terms)

  return (
    <Box>
      <TextField
        label="Add a term"
        placeholder="e.g. Fall 2022, 3A,..."
        type="text"
        value={termName}
        onChange={(event) => {
          setTermName(event.target.value)
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          termController.addTerm(termName, dispatch)
          setTermName('')
        }}
      >
        Add
      </Button>

      {terms.status === 'succeeded' ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {terms.value.map((term, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <GridItem>
                  <Typography>
                    <Link to={`/terms/${term.term_pk}`} color="inherit">
                      {term.term_name}
                    </Link>
                  </Typography>
                </GridItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography>{terms.error}</Typography>
      )}
    </Box>
  )
}

export default Home
