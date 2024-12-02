const sendResponse = (res, statusCode, message, data = null, error = null) => {
    res.status(statusCode).json({
      message,
      ...(data && { data }), // Include `data` only if it's not null
      ...(error && { error }), // Include `error` only if it's not null
    });
  };
  
  module.exports = sendResponse;
  