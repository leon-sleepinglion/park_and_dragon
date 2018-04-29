import { GET_USER_URL } from '../config/url.js'
import { getAxios } from '../helpers/tokenHelper'

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
    const res = await getAxios(`${GET_USER_URL}?email=${email}`)
    return {
      ...user,
      ...res.data.user_details,
      coins: res.data.user_details.point
    }
  } catch (error) {
    console.log(error)
    return []
  }
}
