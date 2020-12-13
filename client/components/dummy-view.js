/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductList, getExchangeRates } from '../redux/reducers/products'

import ProductCard from './common/product-card'

const Dummy = () => {
  const dispatch = useDispatch()

  const productNames = useSelector((s) => s.products.productList)
  const currency = useSelector((s) => s.products.currentСurrency)
  const productsInCart = useSelector((s) => s.products.cartList)

  useEffect(() => dispatch(getProductList()), [dispatch])
  useEffect(() => dispatch(getExchangeRates()), [dispatch])

  return (
    <div>
      <div>
        <div>MAIN PAGE</div>
        <div>----------------</div>
        {productNames.map((it) => {
          const q = it.id in productsInCart ? productsInCart[it.id].quantity : 0
          return (
            <div key={it.id}>
              <ProductCard data={it} cur={currency} quan={q} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
