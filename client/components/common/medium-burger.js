/* eslint-disable no-unused-vars */
import React from 'react'

import CurrencyPanel from './currency-panel'
import SortPanel from './sort-panel'

const MediumBurger = () => {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
        <SortPanel /> <CurrencyPanel />
      </span>
    </div>
  )
}

MediumBurger.propTypes = {}

export default React.memo(MediumBurger)
