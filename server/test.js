const event = require('./event')

function waitEvent(eventName){
    return new Promise((resolve,reject)=>{
        event.on(eventName,(data)=>{
            resolve(data)
        })
    })
}

module.exports = waitEvent;