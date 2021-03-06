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
        className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-1 py-2 rounded-md text-sm font-medium"
        onClick={() => dispatch(sortByName())}
      >
        {nameOrder < 0 ? <div>Название ▲</div> : <div>Название ▼</div>}
      </button>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-1 py-2 rounded-md text-sm font-medium"
        onClick={() => dispatch(sortByPrice())}
      >
        {priceOrder < 0 ? <div>Цена ▲</div> : <div>Цена ▼</div>}
      </button>
    </div>
  )
}

SortPanel.propTypes = {}

export default React.memo(SortPanel)
