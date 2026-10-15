import express from 'express';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';

export const app = express();

app.set('trust proxy', env.TRUST_PROXY_HOPS);
app.use(express.json());

app.use('/api', apiRouter);

export default app;
