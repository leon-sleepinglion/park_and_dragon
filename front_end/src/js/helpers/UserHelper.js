import axios from 'axios'
import { GET_USER_URL, UPDATE_USER_URL } from '../config/url.json'

const user = {
  userId: '123444411123123',
  username: 'leonwee',
  email: 'leonweecs@gmail.com',
  mobile: '0123456789',
  joinedSince: '2017-07-17',
  level: '1234',
  coins: 56,
  gems: 72,
  pic: 'https://mobilegamegraphics.com/pvpaterno/GIF/wizard_attack.gif'
}

export const getUser = async email => {
  try {
    const res = await axios.get(`${GET_USER_URL}?email=${email}`)
    return { ...user, ...res.data.user_details }
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
