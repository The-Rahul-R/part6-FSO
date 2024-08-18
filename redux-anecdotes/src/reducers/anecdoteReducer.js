import { createSlice } from "@reduxjs/toolkit"
import anecService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

// export const vote = (id) => {
//   return(
//     {
//       type: 'VOTE',
//       payload: {
//         id: id
//       }
//     }
//   )
// }

// export const create = (content) => {
//   return(
//     {
//       type: 'CREATE',
//       payload: {
//         content,
//         votes: 0,
//       } 
//     }  
//   )
// }

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type){
//     case 'VOTE':{
//       const id = action.payload.id;
//       const anecdoteToBeVoted = state.find(anec => anec.id === id)
//       const updatedAnecdote = {
//         ...anecdoteToBeVoted,
//         votes: anecdoteToBeVoted.votes + 1
//       }
//       return state.map(anec => anec.id != id ? anec : updatedAnecdote)
//     }
//     case 'CREATE': {
//       const id = getId()
//       const newAnec = {
//         ...action.payload,
//         id
//       }
//       return state.concat(newAnec)
//     }
//     default: return state
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      // const id = getId()
      // const newAnec = {
      //   content: action.payload,
      //   votes: 0,
      //   id
      // }
      state.push(action.payload)
    },
    vote(state,action) {
      const id = action.payload;
      const anecdoteToBeVoted = state.find(anec => anec.id === id)
      const updatedAnecdote = {
        ...anecdoteToBeVoted,
        votes: anecdoteToBeVoted.votes + 1
      }
      return state.map(anec => anec.id != id ? anec : updatedAnecdote)
    },
    appendAnec(state,action) {
      state.push(action.payload)
    },
    setAnecs(state,action) {
      return action.payload
    }
  }
})

export const {create,vote,appendAnec,setAnecs} = anecdoteSlice.actions

export const initializeAnecdotesThunk = () => {
  return async (dispatch) => {
    const response = await anecService.getAllAnec()
    dispatch(setAnecs(response))  
  }
}

export const createAnecdoteThunk = (anec) => {
  return async (dispatch) => {
    const response = await anecService.createAnec(anec)
    dispatch(create(response))
  }
}

export const increaseVoteThunk = (anecId) => {
  return async dispatch => {
    const response = await anecService.updateVote(anecId)
    dispatch(vote(response.id))
  }
}

export default anecdoteSlice.reducer