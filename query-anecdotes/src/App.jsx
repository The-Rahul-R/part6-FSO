import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useQueryClient,useMutation } from '@tanstack/react-query'
import { getAnecdotes,updateVote } from './service/requests'
import NotificationReducer from './reducers/notificationReducer'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

  const [notification,notificationDispatch] = useReducer(NotificationReducer,'')

  const queryClient = useQueryClient()

  const newVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      // Invalidate the query to refetch the anecdotes list
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote.id)
    notificationDispatch({
      type: 'SETNOTIFICATION',
      payload:{
        message: `${anecdote.content} was upvoted`
      }
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'REMOVENOTIFICATION'
      })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>loading data</div>
  }

  if (result.isError) {
    return <div>Anecdotes service not available due to problem in server</div>
  }

  const anecdotes = result.data
  
  return (
    <NotificationContext.Provider value={[notification,notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
