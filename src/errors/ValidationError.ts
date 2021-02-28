import AppError from "./AppError";
import ErrorI from "./ErrorI";

export class ValidationError extends AppError {
    
    statusCode = 412
    error: ErrorI[];

    constructor(error: ErrorI[]) {
        super('Validation Error');
        
        Object.setPrototypeOf(this, ValidationError.prototype);
        
        this.error = error;
    }

    getError() {
        return this.error;
    }
}