const express = require('express')

const app = express()

const port = 3000

const users = [
  { id: 1, name: 'Kuks' }
]

//middleware
app.use(express.json());

//routes
app.post('/users/:userId', (req, res) => {
  const { userId } = req.params
  console.log('body -> ', req.body)

  users.push({ id: +userId, name: `user${userId}` });
  res.send('successfully added new user');
})

app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params
  const user = users.find(user => user.id === +userId)

  res.send(user)
})

app.put('/users/:userId', (req, res) => {
  const { userId } = req.params

  const user = users.find(user => user.id === +userId)
  user.name += ' - Updated'

  res.send('edited user with PUT request in Express JS')
})

app.delete('/users/:userId', (req, res) => {
  const { userId } = req.params

  const index = users.findIndex(user => userId === user.id)
  users.splice(index, 1)
  res.send('deleted user')
})

app.get('/home', (req, res) => {
  res.send('Welcome to Express home! :)')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})