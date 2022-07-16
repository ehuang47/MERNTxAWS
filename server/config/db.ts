import mongoose from "mongoose";

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL as string, (error) => {
  if (error) console.log(error);
  else console.log("Connected to DB.");
}
);

export default mongoose.connection;
