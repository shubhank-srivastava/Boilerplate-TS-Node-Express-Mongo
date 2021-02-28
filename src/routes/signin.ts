import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from '../errors/ValidationError';
import RequestValidator from '../middlewares/request-validator';
import User from '../models/user.model';
import Password from '../services/password';

const router = express.Router();

router.post('/api/v1/signin', RequestValidator({
    email: { required: true, isEmail: true },
    password: { required: true }
}), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
        throw new ValidationError([{message: 'User does not exist.'}]);
    }

    if (Password.match(existingUser.password, existingUser.salt, req.body.password)) {
        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);
        return res.json({ user: existingUser, token });
    } else {
        throw new ValidationError([{message: 'Password incorrect.'}]);
    }
})

export default router;