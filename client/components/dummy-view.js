/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductList, getExchangeRates } from '../redux/reducers/products'

import ProductCard from './common/product-card'

const Dummy = () => {
  const dispatch = useDispatch()

  const productNames = useSelector((s) => s.products.productList)
  const rates = useSelector((s) => s.products.exchangeRates)
  const currency = useSelector((s) => s.products.currentСurrency)
  const productsInCart = useSelector((s) => s.products.cartList)

  useEffect(() => dispatch(getProductList()), [])
  useEffect(() => dispatch(getExchangeRates()), [])

  return (
    <div>
      <div>
        <div>----------------</div>
        <div>----------------</div>
        {productNames.map((it) => {
          let q = productsInCart.find((cartItem) => cartItem.id === it.id)
          q = q ? q.quantity : 0
          return (
            <div key={it.id}>
              <ProductCard data={it} cur={currency} quan={q} />
            </div>
            // <div key={it.id}>
            //   <div>{it.title}</div>
            //   <div>
            //     {(it.price * +currency[0]).toFixed(2)} {currency[1]}
            //   </div>
            //   <button type="button">Add to cart</button>
            //   {typeof it.quantity === 'undefined' || it.quantity === 0 ? null : (
            //     <div>{it.quantity}</div>
            //   )}
            //   <div>----------------</div>
            // </div>
          )
        })}
        <div>{JSON.stringify(rates)}</div>
      </div>
      {/* <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is dummy component
        </div>
      </div> */}
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
