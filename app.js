const a = 5
const b = 6
function sum(num1, num2) {
  return num1+num2
}
console.log('a + b =', sum(a, b))

const axios = require('axios');

// axios.get('https://jsonplaceholder.typicode.com/todos')
//   .then(res => {
//     console.log('API response: ', res.data[0]);
//   })


axios.get('http://localhost:3000/')
  .then(res => {
    console.log('API response: ', res);
  })