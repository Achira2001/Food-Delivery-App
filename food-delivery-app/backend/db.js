const mongoose = require('mongoose');
    
const mongoURI = ''

const mongoDB = () =>{
    mongoose.conncect(mongoURI,(=>{
        console.log("connected")
    }))
    
}
