import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '..'
import { BlockParams2 } from '../components/types'
import { setBlocks } from '../reducers/blocks'
import CourseController from './courseController'

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
      console.log(`Add block ${params.blockName} successfully`)
      this.getBlocks().then((res) => {
        dispatch(setBlocks(res.data))
      })
    })
    return true
  }

  updateEntries = async (
    entryArray: Array<number>,
    blockPk: number,
    courseFk: number,
    dispatch: AppDispatch
  ) => {
    if (entryArray.filter((entry) => entry < 0)[0]) {
      alert('Error: negative entry')
      throw 'Error: negative entry'
    }
    const entries: string = JSON.stringify(entryArray)

    try {
      // Update entries
      await axios.put('http://localhost:3001/blocks/update_entries', {
        entries: entries,
        blockPk: blockPk,
      })
      console.log(`Update entries successfully`)
      const getBlocksResponse = await this.getBlocks()
      dispatch(setBlocks(getBlocksResponse.data))

      // Update course average
      const courseController = new CourseController()
      await courseController.updateCourseAverage(courseFk, dispatch)
    } catch (err) {
      throw err
    }
  }
}
