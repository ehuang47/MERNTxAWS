import mongoose from "mongoose";
import { UserInterface, UserDocInterface, UserModelInterface } from "../types";
// import * as models from "../types";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  profile: String,
  name: String,
  email: String,
  phone: String
});

userSchema.statics.build = async (user: UserInterface) => {
  return await User.create(user);
};

const User = mongoose.model<UserDocInterface, UserModelInterface>("User", userSchema, "User");
export default User;
