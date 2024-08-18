import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state,action) {
            return action.payload
        },
        removeNotification() {
            return null
        },
    }
})

export default notificationSlice.reducer

export const {setNotification,removeNotification} = notificationSlice.actions

export const improvedNotification =(message,duration=1)=> {
    return  dispatch => {
        console.log('came here')
        dispatch(setNotification(message))
        setTimeout(()=> {
            console.log('came to timeout')
            dispatch(removeNotification())
        },duration*1000)
    }
}
