import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '..'
import { setTerms } from '../reducers/terms'

axios.defaults.withCredentials = true

export default class TermController {
  getTerms = (): Promise<AxiosResponse> => {
    return axios.get('http://localhost:3001/terms')
  }

  addTerm = (termName: string, dispatch: AppDispatch): void => {
    if (!termName) return
    axios
      .post('http://localhost:3001/terms/add', {
        termName: termName,
      })
      .then(() => {
        console.log(`add term ${termName} successfully`)
        this.getTerms().then((res) => {
          dispatch(setTerms(res.data))
        })
      })
  }

  deleteTerm = (
    termPk: number, // TODO: #6 termPks: Array<number>
    termName: string,
    dispatch: AppDispatch
  ): boolean => {
    // TODO: delete all courses associated with term (#6)
    if (window.confirm(`Are you sure you want to remove ${termName} term?`)) {
      axios.delete(`http://localhost:3001/terms/delete/${termPk}`).then(() => {
        this.getTerms().then((res) => {
          dispatch(setTerms(res.data))
        })
      })
      return true
    }
    return false
  }
}
