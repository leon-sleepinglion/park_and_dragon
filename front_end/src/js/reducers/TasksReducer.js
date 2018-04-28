const initialState = []

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TASKS':
      return action.payload
    default:
      return state
  }
}

export default tasks
