import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/ValidationError';

type Validations = {
    required?: boolean;
    isEmail?: boolean;
}

type ValidatorParams = Record<string, Validations>;

const RequestValidator = (params: ValidatorParams) => (req: Request, res: Response, next: NextFunction) => {
    const errors = [];

    for (let key in params) {
        if (params[key].required && !req.body[key]) {
            errors.push({ message: `${key} is required.` });
        }
        // TODO: add proper email check
        if (params[key].isEmail && req.body[key] && req.body[key].indexOf('@') === -1) {
            errors.push({ message: `${key} is invalid.` });
        }
    }

    if (errors.length > 0) 
        throw new ValidationError(errors);
    else
        next();
}

export default RequestValidator;