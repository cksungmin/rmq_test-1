const amqp = require('amqplib');
const axios = require('axios')

class RMQ{
    constructor(){
        this.url = 'amqp://test:1234@192.168.0.144/tt'
        this.connect = null;
        this.channel = null;
    }

    async init(queue){
        this.queue = queue;
        this.connect = await amqp.connect(this.url);
        this.channel = await this.connect.createChannel();
        await this.channel.assertQueue(queue,{durable : true});
    }

    async send(data, delay){
        if(delay){
            await (async function (){
                return new Promise((resolve,reject)=>{
                    setTimeout(resolve,Math.random() * 100)
                })
            })()
        }
        this.channel.sendToQueue(this.queue, Buffer.from(data))
    }

    consume(){
        this.channel.consume(this.queue,data =>{
            console.log(data.content.toString())
            
        },{noAck : true})
    }

    consumeAndSend(rmq, send_data){
        this.channel.consume(this.queue, data =>{
            console.log(data.content.toString())
            rmq.send(send_data ? send_data : data.content.toString(),true);
        },{noAck : true})
    }

    consumeAndPost(){
        try{
            this.channel.consume(this.queue,data =>{
                console.log(data.content.toString())
                axios.post('http://localhost:8080/event',{val : data.content.toString()}).catch(e=>console.log(e))
            },{noAck : true})
        }catch(err){
            console.log(err)
        }

    }
}

module.exports = RMQ;