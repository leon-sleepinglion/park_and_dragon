import { connect } from 'react-redux'
import { updateUser } from '../../actions/UserAction'
import {
  updateUserData,
  updateUserEquipment,
  getUser
} from '../../helpers/UserHelper'

const mapStateToProps = state => {
  return { ...state.user, itemOwned: state.inventory.length }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCoins: async coins => {
      await updateUserData('coins', coins, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    },
    updateAccessory: async accessory => {
      await updateUserEquipment('accessory', accessory, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    },
    updateAddress: async address => {
      await updateUserData('address', address, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    },
    updateGems: async gems => {
      await updateUserData('gems', gems, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    },
    updateMobile: async mobile => {
      await updateUserData('mobile', mobile, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    },
    updatePants: async pants => {
      await updateUserEquipment('pants', pants, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    },
    updateShirt: async shirt => {
      await updateUserEquipment('shirt', shirt, ownProps)
      const user = await getUser()
      dispatch(updateUser(user))
    }
  }
}

const withTaskAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withTaskAction
