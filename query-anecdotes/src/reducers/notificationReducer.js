const NotificationReducer = (state,action) => {
    switch(action.type) {
      case "SETNOTIFICATION":
        return action.payload.message
      case "REMOVENOTIFICATION":
        return null
      default:
        return state
    }
  }

  export default NotificationReducer