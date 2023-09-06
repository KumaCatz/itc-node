const express = require('express')
const fs = require('fs')
const cors = require('cors')
const { DB } = require('./db')
const { ERR, MIDDLEWARE } = require('./utils/errors')

const app = express()
const users = new DB('users')

//middleware - this is for the req.body, cause express.js doesn't come with this automatically
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  console.log("we are on a middleware!")
})

//routes
const middleware = (req, res, next) => {
  console.log("middleware")
}

const controller = (req, res, next) => {
  if (req.body.name === "lala") {
    return next(ERR)
  }
  const content = fs.readFileSync('db/users.json', 'utf-8')
  const json = JSON.parse(content)

  json.push(req.body)

  fs.writeFileSync(`db/users.json`, JSON.stringify(json, null, 2))
  res.send("Created User")
}

app.post('/users', middleware, controller)

// app.post('/users/:userId', (req, res) => {
//   const { userId } = req.params

//   users.push({ id: +userId, name: `user${userId}` });
//   res.send('successfully added new user');
// })

// app.get('/users', (req, res) => {
//   DB.get
//   res.send(JSON.parse(users))
// })

app.get('/users', (req, res) => {
  res.send(users.getData())
})

// app.get('/users/:userId', (req, res) => {
//   res.send(DB.findUserIndex(req.params))
  // const { userId } = req.params

  // const content = fs.readFileSync('db/users.json', 'utf-8')
  // const users = JSON.parse(content)

  // const user = users.find(user => user.id === +userId)
  // res.send(user)
// })

// app.put('/users/:userId', (req, res) => {
//   const { userId } = req.params

//   const content = fs.readFileSync('db/users.json', 'utf-8')
//   const users = JSON.parse(content)

//   const userIndex = users.find(user => user.id === +userId)
//   users[userIndex] = {
//     id: +userId,
//     ...req.body
//   }

//   fs.writeFileSync(`db/users.json`, JSON.stringify(users, null, 2))

//   res.send('edited user with PUT request in Express JS')
// })

// app.delete('/users/:userId', (req, res) => {
//   const { userId } = req.params

//   const content = fs.readFileSync('db/users.json', 'utf-8')
//   const users = JSON.parse(content)
//   const userIndex = users.findIndex(user => user.id === +userId)

//   users.splice(userIndex, 1)
//   fs.writeFileSync(`db/users.json`, JSON.stringify(users, null, 2))

//   res.send('deleted user')
// })

// app.post('/db', (req, res) => {
//   const { name } = req.params
//   const obj = Object.keys(req.body).length ? req.body : []

//   fs.writeFileSync(`db/${name}.json`, JSON.stringify(obj, null, 2))

//   res.send('ok')
// })

// app.get('/db', (req, res) => {
//   fs.readFileSync('db/hello.json', 'utf-8', (err, data) => {
//     console.log(data)
//     res.send(data)
//   })
// })

//error handling
app.use((err, req, res, next) => {
  const [statusCode, msg] = err

  res.status(statusCode).send({
    error: true,
    message: msg
  })
})

app.listen(2500, () => {
  console.log(`Express app listening on port: 2500`)
})