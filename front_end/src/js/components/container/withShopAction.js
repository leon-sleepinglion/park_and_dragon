import { connect } from 'react-redux'
import { updateShopItems } from '../../actions/ShopAction'
import { updateInventory } from '../../actions/InventoryAction'
import { getInventory } from '../../helpers/InventoryHelper'
import { getShopItems, buyShopItems } from '../../helpers/ShopHelper'
import { updateUser } from '../../actions/UserAction'
import { getUser } from '../../helpers/UserHelper'

const mapStateToProps = state => {
  return {
    items: state.shop.items.filter(
      item => !state.inventory.find(owned => owned.id === item.id)
    ),
    coins: state.user.coins,
    gems: state.user.gems,
    inventoryCount: state.inventory.length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateItems: async () => {
      const items = await getShopItems()
      dispatch(updateShopItems(items))
    },
    buyItem: async itemId => {
      await buyShopItems(itemId)
      const items = await getShopItems()
      const inventory = await getInventory()
      const user = await getUser('leonweecs@gmail.com')
      dispatch(updateInventory(inventory))
      dispatch(updateShopItems(items))
      dispatch(updateUser(user))
    }
  }
}

const withTaskAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withTaskAction
