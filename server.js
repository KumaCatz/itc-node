const express = require('express');
const { pokemonsArray } = require('./data');
const { readFile, writeFile } = require('./utils');
const { LOGS } = require('./constants')

const app = express()

const port = 3000

app.use(express.json());

app.get('/hello', (req, res) => {
  res.status(200).send("I am working :)")
})

app.get('/pokemons', (req, res) => {

  res.send(pokemonsArray)
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})