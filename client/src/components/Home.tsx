import * as React from 'react'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TermController from '../controllers/termController'
import { experimentalStyled as styled } from '@mui/material/styles'
import {
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  Container,
} from '@mui/material'

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
    <Container maxWidth="lg" sx={{ mt: 4, width: 4 / 5 }}>
      {terms.status === 'succeeded' ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {terms.value.map((term, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <GridItem>
                  <Link
                    to={`/terms/${term.term_pk}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                  >
                    <Typography>{term.term_name}</Typography>
                  </Link>
                </GridItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography>{terms.error}</Typography>
      )}

      <Box
        component="form"
        onSubmit={() => {
          termController.addTerm(termName, dispatch)
          setTermName('')
        }}
        sx={{
          width: 3 / 10,
          display: 'flex',
          justifyContent: 'flex-start',
          mt: 5,
        }}
      >
        <TextField
          hiddenLabel
          placeholder="Add a term"
          type="text"
          variant="filled"
          size="small"
          value={termName}
          onChange={(event) => {
            setTermName(event.target.value)
          }}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </Container>
  )
}

export default Home
