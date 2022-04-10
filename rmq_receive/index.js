const RMQ = require('../rmq_helper');

const rmq = new RMQ();
main();

async function main(){
    await rmq.init('test2')
    rmq.consume()
}