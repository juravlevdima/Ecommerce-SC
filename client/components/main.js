/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Head from './head'
import Header from './header'
import Dummy from './dummy-view'
import Cart from './cart'

const MainComponent = () => {
  return (
    <div>
      <Head />
      <Header />
      <Route exact path="/" component={() => <Dummy />} />
      <Route exact path="/cart" component={() => <Cart />} />
      <Route exact path="/logs" component={() => <Dummy />} />
    </div>
  )
}

MainComponent.propTypes = {}

export default React.memo(MainComponent)
