import { combineReducers } from 'redux'

const items = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SHOP_ITEMS':
      return action.payload
    default:
      return state
  }
}

const vouchers = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SHOP_VOUCHERS':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ items, vouchers })
