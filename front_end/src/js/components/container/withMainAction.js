import { connect } from 'react-redux'
import { updateShopItems } from '../../actions/ShopAction'
import { getShopItems } from '../../helpers/ShopHelper'
import { updateInventory } from '../../actions/InventoryAction'
import { getInventory } from '../../helpers/InventoryHelper'
import { updateTasks } from '../../actions/TasksAction'
import { getTasks } from '../../helpers/TasksHelper'

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
    }
  }
}

const withMainAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withMainAction
