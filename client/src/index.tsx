import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import termsReducer from './reducers/terms'
import coursesReducer from './reducers/courses'
import blocksReducer from './reducers/blocks'

const store = configureStore({
  reducer: {
    terms: termsReducer,
    courses: coursesReducer,
    blocks: blocksReducer,
  },
})

export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
