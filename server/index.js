const express = require('express');
const timeout = require('connect-timeout');
const waitEvent = require('./test')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid')
const RMQ = require('../rmq_helper')
const event = require('./event')


const app = express();
const rmq = new RMQ()

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(timeout('5s'))

app.listen(8080,async ()=>{
    console.log('server start')
    await rmq.init('test')
})

app.post('/',async (req,res,next)=>{
    console.log('req here');
    const eventName = uuidv4();
    rmq.send(JSON.stringify({
        val : req.body.val,
        eventName
    }))
    const data = await waitEvent(`${eventName}`)
    res.send(''+data)
})

app.post('/event', (req,res,next)=>{
    const data = JSON.parse(req.body.val);
    console.log(data)
    event.emit(`${data.eventName}`,data.val);
    res.send()
})