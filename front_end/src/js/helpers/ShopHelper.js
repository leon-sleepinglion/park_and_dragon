import axios from 'axios'
import { GET_SHOP_ITEMS_URL, BUY_SHOP_ITEMS_URL } from '../config/url.json'

export const getShopItems = async () => {
  try {
    const res = await axios.get(GET_SHOP_ITEMS_URL)
    console.log(res)
    return res.map(task => ({
      itemId: res.id,
      itemName: res.name,
      itemDescription: res.description,
      itemCoins: res.coins,
      itemGems: res.gems,
      itemOwned: res.owned,
      itemType: res.type
    }))
  } catch (error) {
    console.log(error)
  }
}

export const buyShopItems = async itemId => {
  try {
    const res = await axios.post(BUY_SHOP_ITEMS_URL, { id: itemId })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}
