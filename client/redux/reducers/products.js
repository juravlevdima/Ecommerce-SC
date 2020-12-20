/* eslint-disable no-param-reassign */
import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_RATES = 'GET_RATES'
const SET_CURRENCY = 'SET_CURRENCY'
const SORT_BY_NAME = 'SORT_BY_NAME'
const SORT_BY_PRICE = 'SORT_BY_PRICE'
const ADD_TO_CART = 'ADD_TO_CART'
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'

const initialCartFromLocalStorage = localStorage.getItem('ecommerceCart') || '{}'

const initialState = {
  productList: [],
  cartList: JSON.parse(initialCartFromLocalStorage),
  exchangeRates: {},
  currentСurrency: ['1', '$'],
  orderByName: 1,
  orderByPrice: 1,
  searchValue: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        productList: action.prod
      }
    }
    case GET_RATES: {
      return {
        ...state,
        exchangeRates: action.rates
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currentСurrency: action.cur
      }
    }
    case SORT_BY_NAME: {
      return {
        ...state,
        productList: action.prod,
        orderByName: action.nameOrder,
        cartList: { ...action.cart }
      }
    }
    case SORT_BY_PRICE: {
      return {
        ...state,
        productList: action.prod,
        orderByPrice: action.priceOrder,
        cartList: { ...action.cart }
      }
    }
    case ADD_TO_CART: {
      localStorage.setItem('ecommerceCart', JSON.stringify(action.list))
      return {
        ...state,
        cartList: { ...action.list }
      }
    }
    case SET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.value
      }
    }
    default:
      return state
  }
}

function fromEntriesPolyfill(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}

export function getProductList() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products

    if (!productList.length) {
      axios.get(`/api/v1/data`).then(({ data }) => {
        dispatch({ type: GET_PRODUCTS, prod: data })
      })
    }
  }
}

export function getExchangeRates() {
  return (dispatch) => {
    axios.get(`/api/v1/exchange_rates`).then(({ data }) => {
      dispatch({ type: GET_RATES, rates: { ...data } })
    })
  }
}

export function setCurrentCurrency(val, char) {
  return (dispatch, getState) => {
    const store = getState()
    const { exchangeRates } = store.products
    const { currentСurrency } = store.products
    dispatch({ type: SET_CURRENCY, cur: [exchangeRates[val], char] })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `change currency from '${currentСurrency[1]}' to '${char}'`
      }
    })
  }
}

export function sortByName() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    const { cartList } = store.products
    const { orderByName: order } = store.products

    const productListSort = (a, b) =>
      order > 0 ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)

    const cartSort = (a, b) =>
      order > 0 ? a[1].title.localeCompare(b[1].title) : b[1].title.localeCompare(a[1].title)

    const sortedList = [...productList].sort(productListSort)
    // const sortedCart = Object.fromEntries(Object.entries(cartList).sort(cartSort))
    const sortedCart = fromEntriesPolyfill(Object.entries(cartList).sort(cartSort))

    dispatch({ type: SORT_BY_NAME, prod: sortedList, nameOrder: order * -1, cart: sortedCart })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `sort by name`
      }
    })
  }
}

export function sortByPrice() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    const { cartList } = store.products
    const { orderByPrice: order } = store.products

    const productListSort = (a, b) => (order > 0 ? a.price - b.price : b.price - a.price)

    const cartSort = (a, b) => (order > 0 ? a[1].price - b[1].price : b[1].price - a[1].price)

    const sortedList = [...productList].sort(productListSort)
    // const sortedCart = Object.fromEntries(Object.entries(cartList).sort(cartSort))
    const sortedCart = fromEntriesPolyfill(Object.entries(cartList).sort(cartSort))

    dispatch({ type: SORT_BY_PRICE, prod: sortedList, priceOrder: order * -1, cart: sortedCart })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `sort by price`
      }
    })
  }
}

export function cartAddRemove(data, action) {
  return (dispatch, getState) => {
    const store = getState()
    const { cartList } = store.products
    const suffix = action === 'add' ? 'to' : 'from'
    let deleteAll = false

    if (action === 'add') {
      if (data.id in cartList) {
        cartList[data.id] = { ...data, quantity: (cartList[data.id].quantity += 1) }
      } else {
        cartList[data.id] = { ...data, quantity: 1 }
      }
    } else if (action === 'remove') {
      if (data.id in cartList) {
        if (cartList[data.id].quantity > 1) {
          cartList[data.id] = { ...data, quantity: (cartList[data.id].quantity -= 1) }
        } else {
          delete cartList[data.id]
        }
      }
    } else if (action === 'delete') {
      delete cartList[data.id]
    } else if (action === 'delete_all') {
      deleteAll = true
      dispatch({ type: ADD_TO_CART, list: {} })
    }

    if (!deleteAll) dispatch({ type: ADD_TO_CART, list: cartList })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `${action} '${data.title}' ${suffix} the cart`
      }
    })
  }
}

export function setSearchValue(value) {
  return (dispatch) => {
    dispatch({ type: SET_SEARCH_VALUE, value })
  }
}
