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
    termPk: number,
    termName: string,
    dispatch: AppDispatch
  ): boolean => {
    if (
      window.confirm(`Are you sure you want to remove \"${termName}\" term?`)
    ) {
      axios.delete(`http://localhost:3001/terms/delete/${termPk}`).then(() => {
        this.getTerms().then((res) => {
          dispatch(setTerms(res.data))
        })
      })
      return true
    }
    return false
  }

  updateTermAverageByCourse = async (
    coursePk: number,
    dispatch: AppDispatch
  ) => {
    try {
      await axios.put('http://localhost:3001/terms/update_average', {
        coursePk: coursePk,
      })
      console.log(`Update term average successfully`)
      const getTermsResponse = await this.getTerms()
      dispatch(setTerms(getTermsResponse.data))
    } catch (err) {
      throw err
    }
  }
}
