import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

import config from './config/config';
import booksRouter from './routes/books.routes';
import authRouter from './routes/auth.routes';
import paymentRouter from './routes/auth/payment.routes';
import passportMiddleware from './middlewares/passport';

const expressHandleBars = require('express-handlebars');
const app = express();

// Settings
app.set("port", config.PORT);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs', expressHandleBars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: '.hbs'
}));
app.set("view engine", '.hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use(booksRouter);
app.use(authRouter);
app.use(paymentRouter);

export default app;