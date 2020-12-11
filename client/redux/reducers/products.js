/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_RATES = 'GET_RATES'
const SET_CURRENCY = 'SET_CURRENCY'
const SORT_BY_NAME = 'SORT_BY_NAME'
const SORT_BY_PRICE = 'SORT_BY_PRICE'
const ADD_TO_CART = 'ADD_TO_CART'

const initialState = {
  productList: [],
  cartList: [],
  // cartList: [{"id":"c7f6153d-5586-495c-beb2-4758bb8a6451","title":"Beer - Labatt Blue","image":"http://dummyimage.com/128x151.jpg/dddddd/000000","price":10,"description":"recontextualize rich eyeballs", "quantity": 3}],
  exchangeRates: {},
  currentСurrency: ['1', '$'],
  orderByName: 1,
  orderByPrice: 1
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
        orderByName: action.nameOrder
      }
    }
    case SORT_BY_PRICE: {
      return {
        ...state,
        productList: action.prod,
        orderByPrice: action.priceOrder
      }
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cartList: action.list
      }
    }
    default:
      return state
  }
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
      dispatch({ type: GET_RATES, rates: { ...data, USD: '1' } })
    })
  }
}

export function setCurrentCurrency(val, char) {
  return (dispatch, getState) => {
    const store = getState()
    const { exchangeRates } = store.products
    dispatch({ type: SET_CURRENCY, cur: [exchangeRates[val], char] })
  }
}

export function sortByName() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    const { orderByName: order } = store.products

    const arraySort = (a, b) =>
      order > 0 ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)

    const sortedList = [...productList].sort(arraySort)

    dispatch({ type: SORT_BY_NAME, prod: sortedList, nameOrder: order * -1 })
  }
}

export function sortByPrice() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    const { orderByPrice: order } = store.products

    const arraySort = (a, b) => (order > 0 ? a.price - b.price : b.price - a.price)

    const sortedList = [...productList].sort(arraySort)

    dispatch({ type: SORT_BY_PRICE, prod: sortedList, priceOrder: order * -1 })
  }
}

export function addToCart(id) {
  return (dispatch, getState) => {
    const store = getState()
    const { cartList } = store.products
    const product = cartList.find((it) => it.id === id)

    if (product) {
      const updatedCartList = cartList.map((it) => {
        if (it.id === id) {
          it.quantity += 1
        }
        return it
      })
    }
    dispatch({ type: ADD_TO_CART, list: cartList })
  }
}
