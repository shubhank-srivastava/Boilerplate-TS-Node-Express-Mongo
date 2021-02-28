import AppError from './AppError';

class NotFoundError extends AppError {
    
    statusCode = 404

    constructor() {
        super('The resource cannot be found.');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    getError() {
        return [{ message: this.message, field: undefined }];
    }
}

export default NotFoundError;