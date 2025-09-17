// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

const server = express();

export const api = functions.https.onRequest(async (req, res) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  server(req, res);
});
