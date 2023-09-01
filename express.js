const express = require('express')
const fs = require('fs')
const cors = require('cors')
const db = require('./db')

const app = express()

const port = 2500

//middleware - this is for the req.body, cause express.js doesn't come with this automatically
app.use(express.json());
app.use(cors())

//routes
app.post('/users', (req, res) => {
  const content = fs.readFileSync('db/users.json', 'utf-8')
  const json = JSON.parse(content)

  json.push(req.body)

  fs.writeFileSync(`db/users.json`, JSON.stringify(json, null, 2))
  res.send("Created User")
})

app.post('/users/:userId', (req, res) => {
  const { userId } = req.params

  users.push({ id: +userId, name: `user${userId}` });
  res.send('successfully added new user');
})

app.get('/users', (req, res) => {
  const users = fs.readFileSync('db/users.json', 'utf-8')
  res.send(JSON.parse(users))
})

app.get('/users/:userId', (req, res) => {
  res.send(db.findUserIndex(req.params))
  // const { userId } = req.params

  // const content = fs.readFileSync('db/users.json', 'utf-8')
  // const users = JSON.parse(content)

  // const user = users.find(user => user.id === +userId)
  // res.send(user)
})

app.put('/users/:userId', (req, res) => {
  const { userId } = req.params

  const content = fs.readFileSync('db/users.json', 'utf-8')
  const users = JSON.parse(content)

  const userIndex = users.find(user => user.id === +userId)
  users[userIndex] = {
    id: +userId,
    ...req.body
  }

  fs.writeFileSync(`db/users.json`, JSON.stringify(users, null, 2))

  res.send('edited user with PUT request in Express JS')
})

app.delete('/users/:userId', (req, res) => {
  const { userId } = req.params

  const content = fs.readFileSync('db/users.json', 'utf-8')
  const users = JSON.parse(content)
  const userIndex = users.findIndex(user => user.id === +userId)

  users.splice(userIndex, 1)
  fs.writeFileSync(`db/users.json`, JSON.stringify(users, null, 2))

  res.send('deleted user')
})

app.get('/home', (req, res) => {
  res.send('Welcome to Express home! :)')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

app.post('/db', (req, res) => {
  const { name } = req.params
  const obj = Object.keys(req.body).length ? req.body : []

  fs.writeFileSync(`db/${name}.json`, JSON.stringify(obj, null, 2))

  res.send('ok')
})

app.get('/db', (req, res) => {
  fs.readFileSync('db/hello.json', 'utf-8', (err, data) => {
    console.log(data)
    res.send(data)
  })
})