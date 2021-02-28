import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'express-async-errors';

import SigninRouter from './routes/signin';
import SignupRouter from './routes/singup';
import GetUsersRouter from './routes/users';
import NotFoundError from './errors/NotFoundError';
import errorHandler from './middlewares/error-handler';

const app = express();
app.use(bodyParser.json());

// routes
app.use(SigninRouter);
app.use(SignupRouter);
app.use(GetUsersRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

// db connection
async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to mongo db!');
    } catch (err) {
        console.log(err);
    }
    
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
}

start();
