import axios from 'axios'
import { LOGIN_URL, TWIZO_URL, PROTECTED_URL } from '../config/url.json'

export const loginAttempt = async (email, password) => {
  try {
    const res = await axios.post(LOGIN_URL, { email, password })
    return res.data.credentials[0]
  } catch (err) {
    console.log(err)
    return false
  }
}

export const twizoVerification = async (key, email, loginSuccess) => {
  try {
    const res = await axios.post(TWIZO_URL, { messageId: key, email })
    storeJWT(res.data.access_token)
    loginSuccess()
  } catch (err) {
    setTimeout(() => twizoVerification(key, email, loginSuccess), 500)
  }
}

export const storeJWT = jwt => localStorage.setItem('sipehSecret', jwt)

export const verifyJWT = async loginSuccess => {
  try {
    const token = localStorage.getItem('sipehSecret')
    const res = await axios.get(PROTECTED_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res)
    loginSuccess()
  } catch (err) {
    console.log(err)
  }
}
