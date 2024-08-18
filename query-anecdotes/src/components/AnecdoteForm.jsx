import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../service/requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {


  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      // Invalidate the query to refetch the anecdotes list
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const [notification,notificationDispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('content length=',content.length)
    event.target.anecdote.value = ''
    
    const newAnecdote = {
      content,
      votes: 0,
    }

    newAnecMutation.mutate(newAnecdote)

    if(content.length < 5) {
      notificationDispatch({
        type: 'SETNOTIFICATION',
        payload:{
          message: `${newAnecdote.content} is having less than 5 characters`
        }
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'REMOVENOTIFICATION'
        })
      }, 5000)
    } else {
      notificationDispatch({
        type: 'SETNOTIFICATION',
        payload:{
          message: `${newAnecdote.content} is created`
        }
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'REMOVENOTIFICATION'
        })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
