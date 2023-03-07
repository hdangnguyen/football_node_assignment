import express from 'express';
import connect from './database/mongodb';
import { loggerMiddleware } from './middlewares/morgan';
import playerRouter from './routes/playerRouter';
import nationRouter from './routes/nationRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

const FileStore = require('session-file-store')(session);

const app = express();
const port = process.env.PORT || 3000;
app.use(loggerMiddleware);
// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    name: 'session',
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
require('./middlewares/passportConfig');
// init passport on every route call.
app.use(passport.initialize());
// allow passport to use "express-session".
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/player', playerRouter);
app.use('/auth', authRouter);
app.use('/nation', nationRouter);
app.use('/user', userRouter);
// define route for localhost:5000/nations
app.use('/', playerRouter);

// Connect to MongoDB
connect();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
