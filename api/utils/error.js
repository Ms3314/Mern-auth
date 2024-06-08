// --> this is a basic function that take in custom status codes and then convert it into an error 
export const errorHandler = (statuscode, message) => {  
    const error = new Error()
    error.statuscode = statuscode
    error.message = message
    return error
              }