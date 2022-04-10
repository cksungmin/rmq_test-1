const axios = require('axios');

// axios.post('http://localhost:8080',{
//     val : 1
// }).then(res => console.log(res.data))

for(let i =0; i<10; i++){
    axios.post('http://localhost:8080',{
        val : i
    }).then(res => console.log(`here i am i : [${i}], res : [${res.data}]`))
}
// axios.post('http://localhost:8080',{
//     val : 1
// }).then(res => console.log(`here i am i : [${i}], res : [${res.data}]`))