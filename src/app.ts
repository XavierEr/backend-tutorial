import 'dotenv/config';

import { URL } from 'node:url';
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';

import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import protectedRouter from './routes/protected.js';
import heartbeatRouter from './routes/heartbeat.js';

const __dirname = new URL('.', import.meta.url).pathname;

const app = express();

app.set('port', (process.env.PORT) || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/protected', protectedRouter);
app.use('/heartbeat', heartbeatRouter);

// app.listen(app.get('port'), () => {
//   console.log(`Node app listening on port`, app.get('port'));
//   console.log(`Node environment`, process.env.NODE_ENV || 'development');
// });

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../localhost+2-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../localhost+2.pem')),
};

https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`Node app listening on port`, app.get('port'));
  console.log(`Node environment`, process.env.NODE_ENV || 'development');
});

export default app;