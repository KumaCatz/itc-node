const fs = require('fs')

class DB {
  constructor(name) {
    this.name = name
    this.path = `./db`
  }

  getData = (name) => {
    const content = fs.readFileSync(`db/${name}.json`, 'utf-8')
    const json = JSON.parse(content)
    return json
  }

  add = (name, body) => {
    const arr = getData(name)
    json.push(body)
    
  }
  
}

const findUserIndex = (params) => {
  const { userId } = params
  const content = fs.readFileSync('db/users.json', 'utf-8')
  const users = JSON.parse(content)
  const userIndex = users.find(user => user.id === +userId)

  return {
    userIndex
  }
}

const getData = (name) => {
  const content = fs.readFileSync(`db/${name}.json`, 'utf-8')
  const json = JSON.parse(content)
  return json
}

const add = (name, body) => {
  const arr = getData(name)
  json.push(body)
  
}

module.exports = { findUserIndex }