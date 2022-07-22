const Note = require('../models/Note');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllNotes = async(req,res)=>{
    const notes = await Note.find({createdBy:rq.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({notes, count:notes.length});
}

const getNote = async(req,res)=>{
    const{
        user:{userId},
        params:{symbol},
    } = req;

    let note = await Note.findOne({
        createdBy:userId,
        symbol:symbol
    })
    if(!note){
        note = await Note.create({symbol, createdBy:userId, notes:""});
    }
    res.status(StatusCodes.OK).json({note});
}

const updateNote = async(req,res)=>{
    let{
        body:{notes},
        user:{userId},
        params:{id:noteId}
    } = req;
    if(!notes){
        notes ="";
    }
    const note = await Note.findByIdAndUpdate(
        {_id:noteId, createdBy:userId},
        {notes},
        {new:true, runValidators:true}
    )
    if(!note){
        throw new NotFoundError(`No note with id ${noteId}`)
    }
    res.status(StatusCodes.OK).json({note});
}

module.exports = {
    getNote,
    getAllNotes,
    updateNote
}