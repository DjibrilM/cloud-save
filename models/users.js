const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    firstName:{
        type:String,
        required:true
    },
    secondName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    secretQuestion:{
        type:String
    },
    secretAnswer:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('user',user);