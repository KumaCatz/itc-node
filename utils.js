const fs = require('fs')

const readFile = (path) => {}

const writeFile = (path, data) => {

  fs.writeFile('./logs.txt', 'Got pokemon call at')
}

module.exports = {readFile, writeFile}