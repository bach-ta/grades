import axios from 'axios'

export const addTerm = (termName) => {
  if (!termName) return
  axios.post('http://localhost:3001/terms/add', {
    termName: termName
  }).then(() => {
    console.log(`add term ${termName} successfully`)
  })
}

export const deleteTerm = (termPk, termName) => {
  if (window.confirm(`Are you sure you want to remove ${termName} term?`)) {
    axios.delete(`http://localhost:3001/terms/delete/${termPk}`).then(res => {
      // dispatch(setTerms(terms.filter(val => val.termPk !== termPk )))
      // dispatch children of terms as well
    })
  }
}