/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentCurrency } from '../../redux/reducers/products'

const CurrencyPanel = () => {
  const dispatch = useDispatch()

  const onClick = (val, char) => {
    dispatch(setCurrentCurrency(val, char))
  }

  return (
    <div>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium active:bg-green-700"
        onClick={() => onClick('USD', '$')}
      >
        USD
      </button>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium active:bg-green-700"
        onClick={() => onClick('EUR', '€')}
      >
        EUR
      </button>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium active:bg-green-700"
        onClick={() => onClick('CAD', 'C$')}
      >
        CAD
      </button>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium active:bg-green-700"
        onClick={() => onClick('RUB', '₽')}
      >
        RUB
      </button>
    </div>
  )
}

CurrencyPanel.propTypes = {}

export default React.memo(CurrencyPanel)
