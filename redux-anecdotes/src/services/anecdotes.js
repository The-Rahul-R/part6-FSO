import axios from "axios";
import { getId } from "../reducers/anecdoteReducer";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnec = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnec = async (anec) => {
    const anecObject = {
        content: anec,
        votes: 0,
        id: getId()
    }
    const response = await axios.post(baseUrl,anecObject)
    return response.data
}

const updateVote = async (anecId) => {
    const anecdotes = await getAllAnec()
    const anecToBeVoted = anecdotes.find(anec => anec.id === anecId)
    const finalAnec = {
        ...anecToBeVoted,
        votes: anecToBeVoted.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${anecId}`,finalAnec)
    return response.data
}

export default {getAllAnec,createAnec,updateVote}