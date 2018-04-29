import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { ...state.user, itemOwned: state.inventory.length }
}

const withTaskAction = Component => connect(mapStateToProps)(Component)

export default withTaskAction
