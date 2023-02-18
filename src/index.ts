import express from 'express';
import connect from './database/mongodb';
import { loggerMiddleware } from './middlewares/middlewares';
import playerRouter from './routes/playerRouter';
import nationRouter from './routes/nationRouter';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';
const app = express();
const port = process.env.PORT || 3000;
app.use(loggerMiddleware);
// use methodOverride middleware

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/player', playerRouter);

app.use('/nation', nationRouter);

// define route for localhost:5000/nations
app.use('/', playerRouter);

// Connect to MongoDB
connect();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
