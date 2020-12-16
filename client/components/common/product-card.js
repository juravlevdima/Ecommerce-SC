/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../scss/styles.scss'

import { cartAddRemove } from '../../redux/reducers/products'

const ProductCard = (props) => {
  const { data } = props
  const { cur: currency } = props
  const { quan: quantity } = props

  const dispatch = useDispatch()

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 border-opacity-25 whitespace-nowrap my-shadow-style">
      <img alt={data.title} className="block object-cover h-64 w-full" src={data.image} />
      <div className="flex items-center justify-between leading-tight p-2">
        <div className="no-underline hover:underline text-black text-base font-semibold">
          {data.title}
        </div>
      </div>
      <div className="mx-2">
        {(data.price * +currency[0]).toFixed(2)} {currency[1]}
      </div>
      <div className="flex items-center justify-center mb-2">
        <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              type="button"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none active:bg-red-400"
              onClick={() => dispatch(cartAddRemove(data, 'remove'))}
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
              value={quantity}
              readOnly
            />
            <button
              type="button"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer active:bg-green-400"
              onClick={() => dispatch(cartAddRemove(data, 'add'))}
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {}

export default React.memo(ProductCard)
