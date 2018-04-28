import { combineReducers } from 'redux'

import ClanReducer from './ClanReducer'
import FeedbackReducer from './FeedbackReducer'
import InventoryReducer from './InventoryReducer'
import ShopReducer from './ShopReducer'
import TasksReducer from './TasksReducer'
import UserReducer from './UserReducer'

export default combineReducers({
  clan: ClanReducer,
  feedback: FeedbackReducer,
  inventory: InventoryReducer,
  shop: ShopReducer,
  tasks: TasksReducer,
  user: UserReducer
})
