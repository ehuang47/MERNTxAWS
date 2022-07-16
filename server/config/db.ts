import mongoose from "mongoose";
const url = "mongodb+srv://test:test@cluster0.nnftb.mongodb.net/profiles?retryWrites=true&w=majority";
mongoose.connect(url, (error) => {
  if (error) console.log(error);
  else console.log("Connected to DB.");
}
);

export default mongoose.connection;
