const mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    roomId : {
        type : String,
        trim : true,
    },
    roomname : {
        type : String,
        trim : true,
    },
    owner : {
        type :String,
        trim : true,
    },
    code : {
        type : String,
    }
}, {timestamps : true});

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;