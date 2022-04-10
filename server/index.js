const express = require('express');
const bodyParser = require('body-parser');
const RMQ = require('../rmq_helper')

const app = express();
const rmq = new RMQ()

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(8080,async ()=>{
    console.log('server start')
    await rmq.init('test')
})

app.post('/',(req,res,next)=>{
    console.log('req here');
    rmq.send(''+req.body.val)
    res.send('res')
})