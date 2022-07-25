import { User } from "../models";
import { Request, Response } from "express";
import { uploadFile } from "../config";

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
    console.log(req.file);
    const newUser = await User.build(req.body);
    const profile = await uploadFile(req.file, newUser._id);
    const updatedUser = await User.findByIdAndUpdate(newUser._id, { $set: { profile } }, { new: true });
    res.status(200).json({ success: true, message: "Successfully added new user profile.", data: updatedUser });
  } catch (e) { handleError("handleAddUserProfile", 400, e as Error, res); }
};

export const handleUpdateProfile = async (req: Request, res: Response) => {
  try {
    const { _id, profile, name, email, phone } = req.body;
    const newUser = await User.findByIdAndUpdate(_id, { $set: { profile, name, email, phone } }, { new: true });
    res.status(200).json({ success: true, message: "Successfully updated user profile.", data: newUser });
  } catch (e) { handleError("handleUpdateProfile", 400, e as Error, res); }
};

export const handleRemoveProfiles = async (req: Request, res: Response) => {
  try {
    // do: check what this function is returning, change to delete many
    await User.deleteMany({ _id: { $in: req.body } });
    res.status(200).json({ success: true, message: "Successfully removed user profiles." });
  } catch (e) { handleError("handleRemoveProfiles", 400, e as Error, res); }
};