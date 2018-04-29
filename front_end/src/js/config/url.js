const BASE = 'http://localhost:5000'

const URL = {
  GET_TASKS_URL: BASE + '/alltasks?user_id=1',
  GET_SHOP_ITEMS_URL: BASE + '/getshopitem?user=1',
  BUY_SHOP_ITEMS_URL: BASE + '/getinventory?user=1',
  GET_INVENTORY_URL: BASE + '/getinventory?user=1',
  LOGIN_URL: BASE + '/login',
  TWIZO_URL: BASE + '/twizo',
  PROTECTED_URL: BASE + '/protected',
  GET_USER_URL: BASE + '/protected'
}

export default URL
