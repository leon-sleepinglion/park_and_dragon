import { connect } from 'react-redux'
import { updateShopItems } from '../../actions/ShopAction'
import { getShopItems } from '../../helpers/ShopHelper'
import { updateInventory } from '../../actions/InventoryAction'
import { getInventory } from '../../helpers/InventoryHelper'
import { updateTasks } from '../../actions/TasksAction'
import { getTasks } from '../../helpers/TasksHelper'
import { getUser } from '../../helpers/UserHelper'
import { updateUser } from '../../actions/UserAction'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    updateItems: async () => {
      const items = await getShopItems()
      dispatch(updateShopItems(items))
    },
    updateInventory: async () => {
      const inventory = await getInventory()
      dispatch(updateInventory(inventory))
    },
    updateTasks: async () => {
      const tasks = await getTasks()
      dispatch(updateTasks(tasks))
    },
    updateUser: async email => {
      const user = await getUser(email)
      dispatch(updateUser(user))
    }
  }
}

const withMainAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withMainAction
