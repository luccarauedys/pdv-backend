import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import router from './routers/index.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express().use(express.json()).use(cors());

app.use(router);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 5000);
