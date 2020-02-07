import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import logger from'morgan';
import dotenv from 'dotenv'

dotenv.config()

var app = express();

// imported route
import login from './routes/users/login'
import register from './routes/users/register'
import postRoute from './routes/contacts/postContact'
import getRoute from './routes/contacts/getAllContacts'
import deleteContact from './routes/contacts/deleteContact'
import updateContact from './routes/contacts/updateContact'

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// route
app.use('/users', login)
app.use('/users', register)
app.use('/api/post', postRoute)
app.use('/api/get', getRoute)
app.use('/api/delete', deleteContact)
app.use('/api/update', updateContact)

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
