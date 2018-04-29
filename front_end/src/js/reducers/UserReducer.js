const initialState = {
  userId: '123444411123123',
  username: 'leonwee',
  email: 'leonweecs@gmail.com',
  mobile: '0123456789',
  joinedSince: '2017-07-17',
  level: '1234',
  coins: 56,
  gems: 72,
  pic: 'https://mobilegamegraphics.com/pvpaterno/GIF/wizard_attack.gif'
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
