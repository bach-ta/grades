import { createSlice } from '@reduxjs/toolkit'

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState: { value: [] },
  reducers: {
    setBlocks: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setBlocks } = blocksSlice.actions
export default blocksSlice.reducer