const inventory = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return action.payload
    default:
      return state
  }
}

export default inventory
