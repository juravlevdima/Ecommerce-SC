import React from 'react'
import { Route } from 'react-router-dom'

import Head from './head'
import Header from './header'
import Dummy from './dummy-view'
import Cart from './cart'

const MainComponent = () => {
  return (
    <div>
      <Head title="Ecommerce Store" />
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <Route exact path="/" component={() => <Dummy />} />
      <Route exact path="/cart" component={() => <Cart />} />
    </div>
  )
}

MainComponent.propTypes = {}

export default React.memo(MainComponent)
