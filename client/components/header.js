/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CurrencyPanel from './common/currency-panel'
import SortPanel from './common/sort-panel'

const Header = () => {
  const currency = useSelector((s) => s.products.currentСurrency[1])

  return (
    <div>
      <div>
        <Link to="/">MAIN PAGE</Link>
      </div>
      <div>
        <Link to="/cart">Go to cart</Link>
      </div>
      <div>Total in cart: {currency}</div>
      <CurrencyPanel />
      <SortPanel />
    </div>
  )
}

Header.propTypes = {}

export default React.memo(Header)
