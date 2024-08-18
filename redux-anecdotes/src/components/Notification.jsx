import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  // useEffect(() => {
  //   setTimeout(()=>{
  //     dispatch(removeNotification())
  //   },5000)
  // },[notification,dispatch])

  if(notification == null) return
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification