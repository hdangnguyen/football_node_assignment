import express from 'express';
import connect from './database/mongodb';
import { loggerMiddleware } from './middlewares/middlewares';
import playerRoute from './routes/playerRoute';
import methodOverride from 'method-override';

const app = express();
const port = process.env.PORT || 3000;
app.use(loggerMiddleware);
// use methodOverride middleware
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/player', playerRoute);
app.use('/', playerRoute);
app.get('/', (req, res) => {
  res.redirect('/players');
});

// Connect to MongoDB
connect();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
