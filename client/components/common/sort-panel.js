/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortByName, sortByPrice } from '../../redux/reducers/products'

const SortPanel = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <button type="button" className="border-black border-2" onClick={() => dispatch(sortByName())}>
        Name
      </button>
      <button type="button" className="border-black border-2" onClick={() => dispatch(sortByPrice())}>
        Price
      </button>
    </div>
  )
}

SortPanel.propTypes = {}

export default React.memo(SortPanel)
