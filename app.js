import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import {
  renderDashboardPage,
  renderLoginPage,
  renderRegisterPage,
} from './routes/website/index.js';
import authRouter from './routes/api/auth.routes.js';
import { verifyLogin } from './middleware/auth.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MongoDBStoreSession = MongoDBStore(session);
const store = new MongoDBStoreSession({
  uri: process.env.MONGO_URL,
  collection: 'sessions',
});

app.use(
  session({
    store,
    secret: 'ironman',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000000,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);
app.use(cookieParser());

// should be called here
app.use(morgan('dev'));

// Website Routes
app.use('/register', renderRegisterPage);
app.use('/login', renderLoginPage);
app.use('/dashboard', verifyLogin, renderDashboardPage);

// Api Routes
app.use('/api/v1/auth', authRouter);

app.use(express.static('./public'));

app.all('*', (req, res, next) => {
  res.json({ message: `cannot find route ${req.originalUrl} on the server` });
});

app.use((error, req, res, next) => {
  console.log(Object.getOwnPropertyDescriptors(error));
  res.json({ error: error.message });
});

export default app;
