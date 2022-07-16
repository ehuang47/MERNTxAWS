import app from "./server";
import connection from "./config/db";
connection.once('open', () => {
  app.listen(3000, () => {
    console.log(`Server is up and running on https://localhost:3000`);
  });
});