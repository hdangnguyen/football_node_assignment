import express from 'express';
import connect from './database/mongodb';
import { loggerMiddleware } from './middlewares/middlewares';
import playerRoute from './routes/playerRoute';

const app = express();
const port = process.env.PORT || 3000;
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/players', playerRoute);

// Connect to MongoDB
connect();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
