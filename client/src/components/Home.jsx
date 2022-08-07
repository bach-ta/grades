import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { addTerm } from '../controllers/termController'
import { setTerms } from '../reducers/terms'
import axios from 'axios'

const Home = () => {
  const [termName, setTermName] = useState("")

  const dispatch = useDispatch()
  const terms = useSelector(state => state.terms.value).slice(0).reverse()

  return (
    <div className='Home'>
      <TextField 
        label="Add a term"
        placeholder='e.g. Fall 2022, 3A,...'
        type="text"
        value={termName}
        onChange={(event) => {
          setTermName(event.target.value)
        }}
      />
      <Button variant="contained" onClick={() => { 
        addTerm(termName).then(() => {
          setTermName("")
          axios.get('http://localhost:3001/terms').then(res => { dispatch(setTerms(res.data)) })
        })
      }}>
        Add
      </Button>
      
      <ul>
        {terms.map((term, key) => {
          return (
            <li>
              <Link 
                to={`/terms/${term.term_pk}`}
              > 
                {term.term_name}
              </Link>
            </li>
          )
        })}
      </ul>
      
    </div>
  )
}

export default Home

