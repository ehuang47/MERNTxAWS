import express, { Express, Request, Response, NextFunction } from 'express';
import { config } from "dotenv";
config({ path: path.resolve(__dirname, '../.env') });
import path from "path";

import routes from "./routes";
const app: Express = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(routes);

export default app;


