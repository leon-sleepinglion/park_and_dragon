import axios from 'axios'
import { LOGIN_URL, TWIZO_URL, PROTECTED_URL } from '../config/url.json'

export const loginAttempt = async (email, password) => {
  try {
    const res = await axios.post(LOGIN_URL, { email, password })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
    return false
  }
}

export const twizoVerification = async (key, email, loginSuccess) => {
  try {
    const res = await axios.post(TWIZO_URL, { messageId: key, email })
    console.log(res)
    storeJWT(res.access_token)
    loginSuccess()
  } catch (err) {
    setTimeout((key, email) => twizoVerification(key, email, loginSuccess), 500)
  }
}

export const storeJWT = jwt => localStorage.setItem('sipehSecret', jwt)

export const verifyJWT = async loginSuccess => {
  try {
    const token = localStorage.getItem('sipehSecret')
    const res = await axios.get(PROTECTED_URL, {
      Authentication: `bearer ${token}`
    })
    console.log(res)
    loginSuccess()
  } catch (err) {
    console.log(err)
  }
}
