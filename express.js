const express = require('express')
const app = express()
const port = 3000

app.get('/home', (req, res) => {
  res.send('Welcome to Express home! :)')
})

app.post('/home', (req, res) => {
  res.send('Creating something Express-y on Home :O')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})