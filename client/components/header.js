import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import CurrencyPanel from './common/currency-panel'
import SortPanel from './common/sort-panel'

import { setSearchValue } from '../redux/reducers/products'

import './scss/styles.scss'

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [searchInputVisibility, setSearchVisibility] = useState(-1)
  const [searchTitle, setSearchTitle] = useState('')

  const currency = useSelector((s) => s.products.currentСurrency)
  const totalInCart = useSelector((s) => Object.values(s.products.cartList)).reduce(
    (acc, it) => acc + it.quantity,
    0
  )
  const totalPrice = useSelector((s) => Object.values(s.products.cartList))
    .reduce((acc, it) => acc + +it.price * it.quantity * currency[0], 0)
    .toFixed(2)

  const searchInputOnChange = (e) => {
    setSearchTitle(e.target.value)
    dispatch(setSearchValue(e.target.value))
  }

  const searchButtonOnClick = () => {
    setSearchTitle('')
    dispatch(setSearchValue(''))
    setSearchVisibility(searchInputVisibility * -1)
  }

  const navigate = (url) => {
    setSearchTitle('')
    dispatch(setSearchValue(''))

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${url} page`
      }
    })
  }

  return (
    <nav className="bg-gray-800 my-shadow-style">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="sm:block sm:ml-1">
              <div className="flex space-x-5">
                <div className="flex space-x-2">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-2 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('main')}
                  >
                    Главная
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-2 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('cart')}
                  >
                    Корзина
                  </Link>
                  <Link
                    to="/logs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-2 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('logs')}
                  >
                    Логи
                  </Link>
                </div>
                <div className="flex space-x-4">
                  <CurrencyPanel />
                  <SortPanel />
                  {location.pathname !== '/cart' ? (
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                        onClick={searchButtonOnClick}
                      >
                        {searchInputVisibility > 0 ? 'Отмена' : 'Поиск'}
                      </button>
                      {searchInputVisibility > 0 ? (
                        <input
                          type="text"
                          value={searchTitle}
                          className="outline-none h-9 focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 rounded outline-none"
                          onChange={searchInputOnChange}
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="origin-top-right absolute right-0 mt-3.5 w-30 text-white px-3 py-1 rounded-md text-sm font-medium">
                  Товаров в корзине: {totalInCart}
                </div>
                <div className="origin-top-right absolute right-0 -mt-2.5 w-30 text-white px-3 py-1 rounded-md text-sm font-medium">
                  Общая стоимость: {totalPrice} {currency[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default React.memo(Header)
