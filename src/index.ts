import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { connectDB } from './config/db'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

import { errorHandler } from '@sunip9/commoncode'
import { NotFoundError } from '@sunip9/commoncode';

import color from 'colors'

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);



//error handler
app.all('*', async (req, res) => {
    throw new NotFoundError();
  });  
app.use(errorHandler);
  
const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT missing")
    }
    try{
    //Load DB
    connectDB();
    }catch(err){
        console.log(err)
    }
    app.listen(3000, () => {
        console.log('Running on port 3000 !!!')
    })
}

start();
