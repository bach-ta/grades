import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Term from './components/Term'
import Input from '@mui/material/Input';

const App = () => {
  const [termName, setTermName] = useState("")
  const [terms, setTerms] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/terms').then(res => { setTerms(res.data) })
  }, []);

  const addTerm = () => {
    if (termName === "") return
    axios.post('http://localhost:3001/addterm', {
      termName: termName
    }).then(() => {
      console.log("success")
      axios.get('http://localhost:3001/terms').then(res => { setTerms(res.data) })
    })
  }

  return (
    <div className='App'>
      <Input placeholder='Add a term. e.g. Fall 2022, 3A,...' type="text" required="required" onChange={(event) => {
        setTermName(event.target.value)
      }}/>
      <button onClick={addTerm}>
        Add term
      </button>

      {terms.map((val, key) => {
        return <Term termID={val.id} key={key} />
      })}
    </div>
  )
}

export default App

