import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

export const fetchCourses = createAsyncThunk('/terms/fetchCourses', () => {
  return axios.get('http://localhost:3001/courses').then((res) => res.data)
})

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.value = action.payload
      state.error = ''
    })
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.status = 'failed'
      state.value = []
      state.error = action.error.message
    })
  },
})

export const { setCourses } = coursesSlice.actions
export default coursesSlice.reducer
