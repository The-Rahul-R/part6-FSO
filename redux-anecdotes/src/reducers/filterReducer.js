export const filterAction =(filterText)=> {
    return (
        {
            type: 'FILTER',
            payload: {
                filterText
            }
        }
    )
}

const filterReducer = (state='',action) => {
    switch(action.type) {
        case 'FILTER' : {
            const filterText = action.payload.filterText
            return filterText
        }
        default: return state
    }
}

export default filterReducer