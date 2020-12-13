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

// ------------------------------APIs-------------------------------------

server.get('/api/v1/data', (req, res) => {
  readFile(`${__dirname}/data/data.json`, { encoding: 'utf8' }).then((text) =>
    res.json(JSON.parse(text))
  )
})

server.get('/api/v1/exchange_rates', (req, res) => {
  axios
    .get('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,CAD,RUB,USD')
    .then(({ data }) => {
      res.json(data.rates)
    })
})

server.get('/api/v1/logs', (req, res) => {
  readFile(`${__dirname}/data/logs.json`, { encoding: 'utf8' }).then((data) =>
    res.json(JSON.parse(data))
  )
})

server.post('/api/v1/logs', (req, res) => {
  readFile(`${__dirname}/data/logs.json`, { encoding: 'utf8' })
    .then((data) => {
      const logs = JSON.parse(data)
      logs.push(req.body)
      writeFile(`${__dirname}/data/logs.json`, JSON.stringify(logs), { encoding: 'utf8' })
    })
    .then(() => res.json({ status: 'ok' }))
})

server.delete('/api/v1/logs', (req, res) => {
  writeFile(`${__dirname}/data/logs.json`, JSON.stringify([]), { encoding: 'utf8' }).then(() =>
    res.json({ status: 'ok' })
  )
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
