import axios from 'axios'

export const getToken = () => localStorage.getItem('sipehSecret')

export const getHeader = () => ({ Authorization: `Bearer ${getToken()}` })

export const getConfig = () => ({ headers: getHeader() })

export const getAxios = url => axios.get(url, getConfig())

export const postAxios = (url, data) => axios.post(url, data, getConfig())
