import { GET_INVENTORY_URL } from '../config/url.js'
import { getAxios } from './tokenHelper'

export const getInventory = async () => {
  try {
    const res = await getAxios(GET_INVENTORY_URL)
    return res.data.item.map(item => ({
      id: item.id,
      title: item.name,
      description: item.description,
      src: item.image_url
    }))
  } catch (error) {
    console.log(error)
    return []
  }
}
