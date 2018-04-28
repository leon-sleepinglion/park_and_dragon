import axios from 'axios'
import { GET_USER_URL, UPDATE_USER_URL } from '../config/url.json'

export const getUser = async () => {
  try {
    const res = await axios.get(GET_USER_URL)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const updateUserData = async (key, value, user) => {
  try {
    const res = await axios.post(UPDATE_USER_URL, { ...user, [key]: value })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}

export const updateUserEquipment = async (key, value, user) => {
  try {
    const res = await axios.post(UPDATE_USER_URL, {
      ...user,
      equipment: { ...user.equipment, [key]: value }
    })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}
