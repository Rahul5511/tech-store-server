const errorHandler =async (err,req,res,next) => {
   console.log("Error caught in the middleware",err.statusCode)
}

module.exports = errorHandler;