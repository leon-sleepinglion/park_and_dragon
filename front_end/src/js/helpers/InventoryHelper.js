import axios from 'axios'
import { GET_INVENTORY_URL } from '../config/url.json'

export const getInventory = async () => {
  try {
    const res = await axios.get(GET_INVENTORY_URL)
    console.log(res)
    return res.map(task => ({
      itemId: res.id,
      itemName: res.name,
      itemDescription: res.description,
      itemType: res.type
    }))
  } catch (error) {
    console.log(error)
    return []
  }
}
