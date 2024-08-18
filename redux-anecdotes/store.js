import reducer from './src/reducers/anecdoteReducer'
import filterReducer from './src/reducers/filterReducer'
import notificationReducer from './src/reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer : {
      anecdotes:reducer,
      filtered:filterReducer,
      notification: notificationReducer
    }
  })

  export default store
