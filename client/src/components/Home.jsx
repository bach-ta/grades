import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import TermController from '../controllers/termController'
import { setTerms } from '../reducers/terms'

const termController = new TermController()

const Home = () => {
  const [termName, setTermName] = useState('')

  const dispatch = useDispatch()
  const terms = useSelector((state) => state.terms)

  return (
    <div className="Home">
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
          termController.addTerm(termName).then(() => {
            setTermName('')
            termController.getTerms().then((res) => {
              dispatch(setTerms(res.data))
            })
          })
        }}
      >
        Add
      </Button>

      {terms.status === 'succeeded' ? (
        <ul>
          {terms.value.map((term) => {
            return (
              <li key={term.term_pk}>
                <Link to={`/terms/${term.term_pk}`}>{term.term_name}</Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>{terms.error}</p>
      )}
    </div>
  )
}

export default Home
