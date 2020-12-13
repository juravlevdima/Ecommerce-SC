/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortByName, sortByPrice } from '../../redux/reducers/products'

const SortPanel = () => {
  const dispatch = useDispatch()

  const nameOrder = useSelector((s) => s.products.orderByName)
  const priceOrder = useSelector((s) => s.products.orderByPrice)

  return (
    <div>
      <button
        type="button"
        className="border-black border-2"
        onClick={() => dispatch(sortByName())}
      >
        {nameOrder < 0 ? <div>Name 🠝</div> : <div>Name 🠟</div>}
      </button>
      <button
        type="button"
        className="border-black border-2"
        onClick={() => dispatch(sortByPrice())}
      >
        {priceOrder < 0 ? <div>Price 🠝</div> : <div>Price 🠟</div>}
      </button>
    </div>
  )
}

SortPanel.propTypes = {}

export default React.memo(SortPanel)
