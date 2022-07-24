import express, { Express, Request, Response, NextFunction } from 'express';
import path from "path";
import cors from "cors";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, '../.env') });

import routes from "./routes";
const app: Express = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "");
//   next();
// });

app.use(routes);

export default app;


