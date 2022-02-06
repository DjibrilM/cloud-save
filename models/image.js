const mongoose = require('mongoose');
const schema = mongoose.Schema;
const noteSchema = new schema({
title:{
type:String,
require:true,
},
imagepath:{
    type:String,
    require:true
},
IdentTitle:{
    type:String,
    require:true
},
crationDate:{
    type:String,
}
},

)

module.exports = mongoose.model('image',noteSchema);
