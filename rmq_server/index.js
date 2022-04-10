const RMQ = require('../rmq_helper')

const rmqGet = new RMQ();
const rmqSend = new RMQ()
main();
async function main(){
    await rmqGet.init('test');
    await rmqSend.init('test2')
    rmqGet.consumeAndSend(rmqSend)
}