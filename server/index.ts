import app from "./server";
import { connection } from "./config";

const { PORT } = process.env;
connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on https://localhost:${PORT}`);
  });
});
