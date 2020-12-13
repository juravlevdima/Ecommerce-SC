/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
    <div className="header">
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
    </div>
  )
}

Header.propTypes = {}

export default React.memo(Header)
