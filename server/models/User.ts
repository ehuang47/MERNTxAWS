import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface UserInterface {
  profile: string;
  name: string;
  email: string;
  phone: string;
}

interface UserModelInterface extends mongoose.Model<UserDocInterface> {
  build(user: UserInterface): UserDocInterface;
}

interface UserDocInterface extends mongoose.Document, UserInterface { }

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
User.build({ profile: '', name: '', email: '', phone: '' });
export default User;
