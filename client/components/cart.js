/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { cartAddRemove } from '../redux/reducers/products'

const Cart = () => {
  const dispatch = useDispatch()

  const cartList = useSelector((s) => s.products.cartList)
  const currency = useSelector((s) => s.products.currentСurrency)

  return (
    <div>
      <div>CART</div>
      {Object.keys(cartList).length ? null : <div>Cart is empty</div>}
      {Object.values(cartList).map((it) => {
        return (
          <div key={it.id}>
            <div>{it.title}</div>
            <div>
              {(it.price * +currency[0]).toFixed(2)} {currency[1]}
            </div>
            <div>
              <button type="button" onClick={() => dispatch(cartAddRemove(it, 'add'))}>
                Add to cart
              </button>
              <button type="button" onClick={() => dispatch(cartAddRemove(it, 'remove'))}>
                Remove one
              </button>
            </div>
            <div>{it.quantity}</div>
            <div>
              Total for this product: {(it.quantity * it.price * +currency[0]).toFixed(2)} {currency[1]}
            </div>
            <div>
              <button type="button" onClick={() => dispatch(cartAddRemove(it, 'delete'))}>
                Delete from cart
              </button>
            </div>
            <div>-------------</div>
          </div>
        )
      })}
    </div>
  )
}

Cart.propTypes = {}

export default React.memo(Cart)
