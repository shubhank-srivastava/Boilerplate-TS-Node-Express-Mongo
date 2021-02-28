import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from '../errors/ValidationError';
import RequestValidator from '../middlewares/request-validator';
import User from '../models/user.model';

const router = express.Router();

router.post('/api/v1/signup', RequestValidator({
    email: { required: true, isEmail: true },
    password: { required: true }
}), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        throw new ValidationError([{message: 'User already exist.'}]);
    }

    const user = User.build({ email: req.body.email, password: req.body.password });

    const doc = await user.save();

    const token = jwt.sign({ id: doc._id, email: doc.email }, process.env.JWT_KEY!);

    res.status(201).send({user: doc, token});

});

export default router;