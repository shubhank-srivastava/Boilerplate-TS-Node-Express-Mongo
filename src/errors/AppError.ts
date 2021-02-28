import ErrorI from "./ErrorI";

abstract class AppError extends Error {
    
    abstract statusCode: number

    constructor(message: string) {
        super(message);
    }

    abstract getError() : ErrorI[]
}

export default AppError;