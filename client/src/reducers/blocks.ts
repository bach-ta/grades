import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  value: [],
  status: 'idle',
  error: null,
}

export const fetchBlocks = createAsyncThunk('/terms/fetchBlocks', () => {
  return axios.get('http://localhost:3001/blocks').then((res) => res.data)
})

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    setBlocks: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlocks.pending, (state: any) => {
      state.status = 'loading'
    })
    builder.addCase(fetchBlocks.fulfilled, (state: any, action) => {
      state.status = 'succeeded'
      state.value = action.payload
      state.error = ''
    })
    builder.addCase(fetchBlocks.rejected, (state: any, action) => {
      state.status = 'failed'
      state.value = []
      state.error = action.error.message
    })
  },
})

export const { setBlocks } = blocksSlice.actions
export default blocksSlice.reducer
