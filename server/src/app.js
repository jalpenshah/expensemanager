import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import favicon from 'serve-favicon';
import path from 'path';

import logger from './configs/logger';
import routes from './routes';
import { addCorsHeadersInResponse } from './middlewares/cors';
import { sendMail } from './utils/email';

const app = express(); // Initiating express object

// Middlewares
const whiteList = process.env.CORS_ALLOWED_ORIGIN?.split(',');
const corsOptions = {
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    var originIsWhitelisted = whiteList?.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions)); // Enable cors
app.options('*', cors());
app.use(bodyParser.json());
app.use(helmet()); // Set security HTTP headers
app.use(express.json()); // Parse json request body
app.use(express.urlencoded({ extended: true })); // Parse urlencoded request body
app.use(xss()); // Sanitize request data
app.use(compression()); // Gzip compression
app.use(favicon(path.join(__dirname, 'assets/logo-light.png'))); //Favicon

// Template engine for email
app.set('views', path.join(__dirname, 'templates'));
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handling root request
app.get('/', (req, res) => {
  sendMail('jalpenshah@outlook.com', 'asd', null);
  res
    .json({
      author: 'Jalpen Shah',
      contact: 'hi@jalpenshah.com',
      github: 'https://github.com/shahjalpen',
      application: 'https://expensemanager.jalpenshah.com',
    })
    .status(200);
});

// Configure routes
app.use('/api/v1', addCorsHeadersInResponse, routes);

// Redirecting to 404 page for any unknown api request
app.use((req, res) => {
  logger.error(`Could not find resource for ${req.url}`);
  res.sendFile('assets/404.html', { root: __dirname });
});

export default app;
