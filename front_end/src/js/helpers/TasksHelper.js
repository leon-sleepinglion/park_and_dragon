import { GET_TASKS_URL } from '../config/url.js'
import { getAxios } from './tokenHelper'

export const getTasks = async () => {
  try {
    const res = await getAxios(GET_TASKS_URL)
    const tasks = res.data.map(task => ({
      missionId: task.id,
      missionName: task.name,
      missionDescription: task.description,
      missionLocation: task.location,
      missionPoint: task.point,
      missionStatus: task.status
    }))
    return tasks
  } catch (error) {
    console.log(error)
    return []
  }
}
