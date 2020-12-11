/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile, stat, unlink } = require('fs').promises

const { default: Root } = require('../dist/assets/js/ssr/root.bundle')

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

// ----------------------------Functions----------------------------------

const getExchangeRates = async () => {
  const rates = await axios
    .get('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,CAD,RUB')
    .then((res) => res.data.rates)
  return rates
}

// ------------------------------APIs-------------------------------------

server.get('/api/v1/data', (req, res) => {
  readFile(`${__dirname}/data/data.json`, { encoding: 'utf8' }).then((data) =>
    res.json(JSON.parse(data))
  )
})

server.get('/api/v1/exchange_rates', (req, res) => {
  getExchangeRates().then((rates) => {
    res.json({
      EUR: rates.EUR,
      CAD: rates.CAD,
      RUB: rates.RUB
    })
  })
})

// -----------------------------------------------------------------------

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
