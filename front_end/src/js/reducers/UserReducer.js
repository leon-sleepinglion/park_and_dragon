const initialState = {
  id: '',
  name: '',
  email: '',
  address: '',
  mobile: '',
  coins: 0,
  gems: 0,
  equipments: {
    shirt: null,
    pants: null,
    accessory: null
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.payload
    default:
      return state
  }
}

export default user
