"use strict";

/* This will be used to catch asynchronous errors (typically only controllers)
	We need to do this because async functions return promies, if the an error occurs in one of the promises that isn't cause it will terminatet the app (obv)
	This function lets us throw | catch exceptions using the "throw" with the insurance that the error passed to next() callback
	Good practice is to call this function around any middleware / controller function that uses the keyword async
	
*/
const catchAsync = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(err => next(err));
};

export default catchAsync;

