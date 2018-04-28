import axios from 'axios'
import { GET_TASKS_URL } from '../config/url.json'

export const getTasks = async () => {
  try {
    const res = await axios.get(GET_TASKS_URL)
    console.log(res)
    return res.map(task => ({
      missionId: res.id,
      missionName: res.name,
      missionDescription: res.description,
      missionLocation: res.location,
      missionPoint: res.point,
      missionStatus: res.status
    }))
  } catch (error) {
    console.log(error)
  }
}
