/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { cartAddRemove } from '../../redux/reducers/products'

const ProductCard = (props) => {
  const { data } = props
  const { cur: currency } = props
  const { quan: quantity } = props

  const dispatch = useDispatch()

  return (
    <div>
      <div>{data.title}</div>
      <div>
        {(data.price * +currency[0]).toFixed(2)} {currency[1]}
      </div>
      <button type="button" onClick={() => dispatch(cartAddRemove(data, 'add'))}>
        Add to cart
      </button>
      <button type="button" onClick={() => dispatch(cartAddRemove(data, 'remove'))}>
        Remove one
      </button>
      {quantity === 0 ? null : <div>{quantity}</div>}
      <div>----------------</div>
    </div>
  )
}

ProductCard.propTypes = {}

export default React.memo(ProductCard)
