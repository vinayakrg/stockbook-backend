const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        symbol:{
            type:String,
            enum:['goog', 'btc-usd', 'msft', 'amzn', 'eth-usd', 'usdt-usd', 'reliance.ns'],
            required:[true, 'Please provide symbol']
        },
        notes:{
            type:String,
            maxlength:200,
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required:[true, 'please provide user'],
        },
    },
    {timestamps :true}
)

module.exports = mongoose.model('Note',NoteSchema);