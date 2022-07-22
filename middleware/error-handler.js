const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError = {
        //setting defaults
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later'
    }
    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
        customError.statusCode = 400;
    }

    if(err.code && err.code === 11000){
        customError.msg = `An account is already associated with provided ${Object.keys(err.keyValue)}`;
        customError.statusCode = 400;
    }

    if(err.name === 'CastError'){
        customError.msg = `No items found with id: ${err.value}`
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware;