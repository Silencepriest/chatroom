import express from 'express'
import socketIO from 'socket.io'
import http from 'http'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderToStaticNodeStream } from 'react-dom/server'
import jwt from 'jsonwebtoken'
import React from 'react'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import mongooseService from './services/mongoose'
import config from './config'
import Html from '../client/html'
import User from './model/User.model'
import MessageStore from './model/Messages.model'
import jwtStrategy from './services/passport'

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

// let connections = []

const port = process.env.PORT || 8090
const server = express()
const serverHttp = http.createServer(server)
const io = socketIO(serverHttp)

const middleware = [
  passport.initialize(),
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

mongooseService.connect()
passport.use('jwt', jwtStrategy)

middleware.forEach((it) => server.use(it))

const getUser = async (data) => {
  const user = await User.findAndValidateUser(data)
  const payload = { uid: user.id }
  const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
  return { token, user }
}

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', message: `auth error ${err}` })
  }
})

server.post('/api/v1/reg', async (req, res) => {
  const { username, password } = req.body
  try {
    const newUser = new User({ username, password })
    await newUser.save()
    const { user, token } = await getUser(req.body)
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (e) {
    res.json({ status: 'error', message: `${e}` })
  }
})

server.post('/api/v1/auth', async (req, res) => {
  try {
    const { user, token } = await getUser(req.body)
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', message: `auth error ${err}` })
  }
})

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
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

serverHttp.listen(port, () => console.log(`Server Running`))

async function verifyJwt(jwttoken) {
  const jwtUser = jwt.verify(jwttoken, config.secret)
  const user = await User.findById(jwtUser.uid)
  return user
}

let userList = {}

io.on('connection', (socket) => {
  socket.emit('message', 'You have successfully joined the chat')
  console.log(`${socket.id} connected`)

  socket.on('chat message', (msg) => {
    const date = +new Date()
    io.to(msg[0]).emit('incoming message', [msg[1], userList[socket.id], date])
    MessageStore({
      channel: msg[0],
      message: msg[1],
      user: userList[socket.id],
      date
    }).save()
  })

  socket.on('get all messages', async (channel) => {
    const messageList = await MessageStore.find({ channel }).exec()
    const modifiedMessageList = messageList.map((message) => {
      return [message.message, message.user, message.date]
    })
    socket.emit('get all messages', modifiedMessageList)
  })

  socket.on('disconnect user', async ({ jwttoken, socketId }) => {
    try {
      console.log(jwttoken)
      const user = await verifyJwt(jwttoken)
      if (!user.role.find((role) => role === 'admin')) socket.emit('error', 'auth failed')
      console.log(`${socket.id} kicked`)
      io.sockets.sockets.get(socketId).emit('kick')
      io.sockets.sockets.get(socketId).disconnect('kicked')
    } catch (e) {
      console.log(e)
      socket.emit('error', 'auth failed')
    }
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
    delete userList[socket.id]
  })

  socket.on('auth', async (msg) => {
    try {
      const user = await verifyJwt(msg)
      userList = { ...userList, [socket.id]: user.username }
    } catch (e) {
      console.log(`${socket.id} auth error ${e}`)
      socket.emit('error', 'auth failed')
    }
  })

  socket.on('get connections', async (jwttoken) => {
    try {
      const user = await verifyJwt(jwttoken)
      if (!user.role.find((role) => role === 'admin')) {
        socket.emit('error', 'auth failed')
        return
      }
      console.log(userList)
      socket.emit('get connections', userList)
    } catch (e) {
      socket.emit('error', 'auth failed')
    }
  })

  socket.on('channel', (msg) => {
    console.log(`${socket.id} joined ${msg}`)
    socket.join(msg)
  })
})

console.log(`Serving at http://localhost:${port}`)
