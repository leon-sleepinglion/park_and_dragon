import { connect } from 'react-redux'
import { updateShopItems } from '../../actions/ShopAction'
import { getShopItems, buyShopItems } from '../../helpers/ShopHelper'

const mapStateToProps = state => {
  return {
    items: state.shop.items,
    vouchers: state.shop.items
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
      dispatch(updateShopItems(items))
    }
  }
}

const withTaskAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withTaskAction
