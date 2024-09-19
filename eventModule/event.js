const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', () =>{
    console.log("good evening!")
})

for(let i = 0; i < 5; i++){
    eventEmitter.emit('greet');
}

eventEmitter.on('visit', (name) =>{
    console.log(`hii ${name} welcome Back!`)
})

const names = ["avinash", "abhi", "ishu", "chatur", "priya"]

names.map(name =>{
    eventEmitter.emit('visit', name)
})