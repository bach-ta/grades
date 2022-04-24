import { createSlice } from '@reduxjs/toolkit'

export const termsSlice = createSlice({
  name: 'terms',
  initialState: { value: [] },
  reducers: {
    setTerms: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setTerms } = termsSlice.actions
export default termsSlice.reducer