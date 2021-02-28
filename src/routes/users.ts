import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/api/v1/users', (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send();
})

export default router;