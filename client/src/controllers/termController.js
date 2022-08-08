import axios from 'axios'

export default class TermController {
  getTerms = () => {
    return axios.get('http://localhost:3001/terms')
  }

  addTerm = (termName) => {
    if (!termName) return
    return axios
      .post('http://localhost:3001/terms/add', {
        termName: termName,
      })
      .then(() => {
        console.log(`add term ${termName} successfully`)
      })
  }

  deleteTerm = (termPk, termName) => {
    // TODO: delete all courses associated with term
    if (window.confirm(`Are you sure you want to remove ${termName} term?`)) {
      return axios.delete(`http://localhost:3001/terms/delete/${termPk}`)
    }
  }
}
