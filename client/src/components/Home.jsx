import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTerms } from '../reducers/terms'
import { setCourses } from '../reducers/courses'
import { setBlocks } from '../reducers/blocks'
import Term from './Term'
import { TextField, Button } from '@mui/material'

const Home = () => {
  const [termName, setTermName] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3001/terms').then(res => { dispatch(setTerms(res.data)) }).then(() => {
      axios.get('http://localhost:3001/courses').then(res => { dispatch(setCourses(res.data)) }).then(() => {
        axios.get('http://localhost:3001/blocks').then(res => { dispatch(setBlocks(res.data)) })
      })
    })
  }, []);

  const terms = useSelector(state => state.terms.value).slice(0).reverse()

  const postTerm = () => {
    if (termName === "") return
    axios.post('http://localhost:3001/terms/add', {
      termName: termName
    }).then(() => {
      console.log(`add term ${termName} successfully`)
      axios.get('http://localhost:3001/terms').then(res => { dispatch(setTerms(res.data)) })
      setTermName("")
    })
  }

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
      <Button variant="contained" onClick={postTerm}>
        Add
      </Button>
      
      {terms.map((val, key) => {
        return <Term termID={val.id} expanded={key === 0} key={key} />
      })}
    </div>
  )
}

export default Home

