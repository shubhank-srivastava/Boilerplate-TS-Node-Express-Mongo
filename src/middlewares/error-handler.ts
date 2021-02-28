import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.getError());
    }

    console.error(err);
    return res.status(400).json([{ message: 'Something went wrong.' }]);
};

export default errorHandler;
