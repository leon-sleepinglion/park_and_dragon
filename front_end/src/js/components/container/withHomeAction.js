import { connect } from 'react-redux'

const mapStateToProps = state => {
  return state
}

const withHomeAction = Component => connect(mapStateToProps)(Component)

export default withHomeAction
