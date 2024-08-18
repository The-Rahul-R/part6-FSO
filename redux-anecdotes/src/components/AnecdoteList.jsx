import { vote } from "../reducers/anecdoteReducer"
import { useSelector,useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { increaseVoteThunk } from "../reducers/anecdoteReducer"
import { improvedNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filteredText = useSelector(state => state.filtered)
    const anecdotesAll = useSelector(state => state.anecdotes)
    const filteredAnecdotes = anecdotesAll.filter(anec => anec.content.toLowerCase().includes(filteredText.toLowerCase()))

    const handleVote = (id) => {
        const votedAnecdote = filteredAnecdotes.find(anec => anec.id === id)
        // dispatch(setNotifification(`"${votedAnecdote.content}" was voted`))
        // dispatch(vote(id))

        dispatch(improvedNotification(`"${votedAnecdote.content}" was voted`,5))
        dispatch(increaseVoteThunk(id))
    }
    return (
        <div>
            {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList