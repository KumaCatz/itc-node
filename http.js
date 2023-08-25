const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)

  if (req.method === 'GET') {
    switch(req.url) {
      case '/':
        res.write("welcome :)")
        break
      case '/home':
        res.write("you're at home")
        console.log("path: /home")
        break
      case '/about':
        res.write("you're at about")
        console.log("path: /about")
        break
      default:
        res.write("sorry, what path was it again? :(")
        break
    }
  }

  else if (req.method === 'POST') {
    switch(req.url) {
      case '/':
        res.write('creating something :O')
        break
      default:
        res.write('woops, what is it again? :/')
        break
    }
  }
  
  res.end()
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})