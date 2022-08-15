// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import cors from 'cors';
import express, { Express } from 'express';
import { Request, Response } from 'express';
import { PathRouter } from './common/class';

const PORT = process.env.PORT || 10010;

const allowedOrigins = [`http://localhost:${PORT}`];

const corsOption = {
  origin: '*',
};

export class ExpressApp {
  app: Express;

  constructor(routers: PathRouter[]) {
    this.app = express();
    this.app.use(cors(corsOption));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.get('/ping', (req: Request, res: Response) => {
      res.json({ message: 'pong' });
    });
    routers.forEach(router => {
      this.app.use(router.path, router.router);
    });
  }

  listen(port: number) {
    this.app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  }
}
