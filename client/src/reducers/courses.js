import { createSlice } from '@reduxjs/toolkit'

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: { value: [] },
  reducers: {
    setCourses: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setCourses } = coursesSlice.actions
export default coursesSlice.reducer