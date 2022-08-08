import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

export const fetchTerms = createAsyncThunk('/terms/fetchTerms', () => {
  return axios.get('http://localhost:3001/terms').then((res) => res.data)
})

export const termsSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    setTerms: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTerms.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchTerms.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.value = action.payload
      state.error = ''
    })
    builder.addCase(fetchTerms.rejected, (state, action) => {
      state.status = 'failed'
      state.value = []
      state.error = action.error.message
    })
  },
})

export const { setTerms } = termsSlice.actions
export default termsSlice.reducer
