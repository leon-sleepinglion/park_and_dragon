import { GET_SHOP_ITEMS_URL, BUY_SHOP_ITEMS_URL } from '../config/url.js'
import { getAxios, postAxios } from './tokenHelper'

export const getShopItems = async () => {
  try {
    const res = await getAxios(GET_SHOP_ITEMS_URL)
    return res.data.item.map(item => ({
      id: item.id,
      title: item.name,
      description: item.description,
      coins: item.coins,
      gems: item.gems,
      type: item.types,
      logo: item.image_url,
      category: item.category
    }))
  } catch (error) {
    console.log(error)
    return []
  }
}

export const buyShopItems = async itemId => {
  try {
    const res = await postAxios(BUY_SHOP_ITEMS_URL, {
      item_id: itemId,
      user_id: 1
    })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}
