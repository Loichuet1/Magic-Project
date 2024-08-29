

// Define the CustomError class extending the built-in Error class
export default class CustomError extends Error {
    constructor(status, message) {
        // Call the super constructor with the message
        super(message);

        // Assign the status property
        this.status = status;

        // Maintain proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}