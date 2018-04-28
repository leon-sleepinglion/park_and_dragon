import { combineReducers } from 'redux'

import InventoryReducer from './InventoryReducer'
import ShopReducer from './ShopReducer'
import TasksReducer from './TasksReducer'
import UserReducer from './UserReducer'

export default combineReducers({
  inventory: InventoryReducer,
  shop: ShopReducer,
  tasks: TasksReducer,
  user: UserReducer
})
