import express, { Express } from 'express';
import multer, { Multer } from "multer";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, '../.env') });

import routes from "./routes";
const app: Express = express();
const upload: Multer = multer();

app.use(express.json());
app.use(upload.single('profile'));
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


