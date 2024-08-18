import { create } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import anecServices from '../services/anecdotes'
import { createAnecdoteThunk } from "../reducers/anecdoteReducer"
import { improvedNotification } from "../reducers/notificationReducer"

const AnecdoteForm = ()=> {
    const dispatch = useDispatch()

    const createAnecdote =async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      // const newAnec = await anecServices.createAnec(content)
      // dispatch (create(newAnec))
      dispatch(createAnecdoteThunk(content))
      // dispatch (setNotification(`"${content}" was created`))
      dispatch(improvedNotification(`"${content}" was created`,5))
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm