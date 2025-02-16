import { filterAction } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      dispatch(filterAction(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name="filtered" onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter