import { User } from "../models";
import { Request, Response } from "express";

const handleError = (location: string, statusCode: number, error: Error, res: Response) => {
  const { message } = error;
  console.error(`${location}: ${message}`);
  res.statusMessage = message;
  res.status(statusCode).send({ success: false, error: message });
};

export const handleGetUserProfiles = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: "Successfully retrieved all user profiles.", data: users });
  } catch (e) { handleError("handleGetUserProfiles", 400, e as Error, res); }
};

export const handleAddUserProfile = async (req: Request, res: Response) => {
  try {
    const newUser = User.build(req.body);
    res.status(200).json({ success: true, message: "Successfully added new user profile.", data: newUser });
  } catch (e) { handleError("handleAddUserProfile", 400, e as Error, res); }
};

export const handleUpdateProfile = async (req: Request, res: Response) => {
  try {
    const { uid, profile, name, email, string } = req.body;
    const newUser = await User.findByIdAndUpdate(uid, { $set: { profile, name, email, string } }, { new: true });
    res.status(200).json({ success: true, message: "Successfully updated user profile.", data: newUser });
  } catch (e) { handleError("handleUpdateProfile", 400, e as Error, res); }
};

export const handleRemoveProfile = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    // do: check what this function is returning
    const result = await User.findByIdAndDelete(uid);
    console.log(result);
    res.status(200).json({ success: true, message: "Successfully removed user profile." });
  } catch (e) { handleError("handleRemoveProfile", 400, e as Error, res); }
};
