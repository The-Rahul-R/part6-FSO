import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'
// import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import store from '../store'

// const combinedReducer = combineReducers({
//   anecdotes:reducer,
//   filtered:filterReducer
// })

// const store = createStore(combinedReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)