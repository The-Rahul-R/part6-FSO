import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes  =()=>   axios.get(baseUrl).then(res => res.data) 

export const createAnecdote = (anecdote) =>  axios.post(baseUrl,anecdote).then(res => res.data)

export const updateVote = async (anecId) => {
    const anecdotes = await getAnecdotes()
    const anecdoteToBeVoted = anecdotes.find(anec => anec.id === anecId)
    const updatedAnecdote = {
        ...anecdoteToBeVoted,
        votes: anecdoteToBeVoted.votes + 1
    }
    const result = axios.put(`${baseUrl}/${anecId}`,updatedAnecdote)
    return result.data
}