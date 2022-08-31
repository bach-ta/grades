import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '..'
import { BlockParams2 } from '../components/types'
import { setBlocks } from '../reducers/blocks'

export default class BlockController {
  getBlocks = (): Promise<AxiosResponse> => {
    return axios.get('http://localhost:3001/blocks')
  }

  addBlock = (params: BlockParams2, dispatch: AppDispatch): boolean => {
    if (!params.blockName) {
      alert('Block name cannot be empty')
      return false
    }
    if (params.blockWeight <= 0) {
      alert('Block weight must be a positive integer')
      return false
    }
    axios.post('http://localhost:3001/blocks/add', params).then(() => {
      console.log(`add block ${params.blockName} successfully`)
      this.getBlocks().then((res) => {
        dispatch(setBlocks(res.data))
      })
    })
    return true
  }
}
