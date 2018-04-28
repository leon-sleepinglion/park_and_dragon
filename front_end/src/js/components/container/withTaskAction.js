import { connect } from 'react-redux'
import { updateTasks } from '../../actions/TasksAction'
import { getTasks } from '../../helpers/TasksHelper'

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTasks: async () => {
      const tasks = await getTasks()
      dispatch(updateTasks(tasks))
    }
  }
}

const withTaskAction = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component)

export default withTaskAction
