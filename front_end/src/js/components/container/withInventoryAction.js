import { connect } from 'react-redux'
import { updateInventory } from '../../actions/InventoryAction'
import { getInventory } from '../../helpers/InventoryHelper'

const mapStateToProps = state => {
  return {
    inventory: state.inventory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInventory: async () => {
      const inventory = await getInventory()
      dispatch(updateInventory(inventory))
    }
  }
}

const withInventoryAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withInventoryAction
