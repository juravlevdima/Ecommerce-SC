import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CurrencyPanel from './common/currency-panel'
import SortPanel from './common/sort-panel'

import './scss/styles.scss'

const Header = () => {
  const currency = useSelector((s) => s.products.currentСurrency)
  const totalInCart = useSelector((s) => Object.values(s.products.cartList)).reduce(
    (acc, it) => acc + it.quantity,
    0
  )
  const totalPrice = useSelector((s) => Object.values(s.products.cartList))
    .reduce((acc, it) => acc + +it.price * it.quantity * currency[0], 0)
    .toFixed(2)

  const navigate = (url) => {
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="sm:block sm:ml-1">
              <div className="flex space-x-10">
                <div className="flex space-x-3">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('main')}
                  >
                    Главная
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('cart')}
                  >
                    Корзина
                  </Link>
                  <Link
                    to="/logs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('logs')}
                  >
                    Логи
                  </Link>
                </div>
                <div className="flex space-x-8">
                  <CurrencyPanel />
                  <SortPanel />
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

      {/* <div>
      <div>
        <Link to="/" className="border-black border-2" onClick={() => navigate('main')}>
          MAIN PAGE
        </Link>
        <Link to="/cart" className="border-black border-2" onClick={() => navigate('cart')}>
          Go to cart
        </Link>
        <Link to="/logs" className="border-black border-2" onClick={() => navigate('logs')}>
          Logs
        </Link>
      </div>
      <div>Total in cart: {totalInCart}</div>
      <div>
        Total price: {totalPrice} {currency[1]}
      </div>
      <CurrencyPanel />
      <SortPanel />
    </div> */}
    </nav>
  )
}

Header.propTypes = {}

export default React.memo(Header)
