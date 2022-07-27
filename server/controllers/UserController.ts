import { User } from "../models";
import { Request, Response } from "express";
import { s3 } from "../config";

const handleError = (location: string, statusCode: number, error: Error, res: Response) => {
  const { message } = error;
  console.error(`${location}: ${message}`);
  res.statusMessage = message;
  res.status(statusCode).send({ success: false, error: message });
};

export const handleGetUserProfiles = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      users[i].profile = await s3.retrieveImg(users[i]._id);
    }
    res.status(200).json({ success: true, message: "Successfully retrieved all user profiles.", data: users });
  } catch (e) { handleError("handleGetUserProfiles", 400, e as Error, res); }
};

export const handleAddUserProfile = async (req: Request, res: Response) => {
  try {
    const newUser = await User.build(req.body);
    const profile = await s3.uploadFile(req.file, newUser._id);
    // do: check if files deleted successfully with result.Errors.length
    await User.findByIdAndUpdate(newUser._id, { $set: { profile } });
    if (req.file) newUser.profile = s3.createImgSrc(req.file.mimetype as string, req.file.buffer as Buffer);
    res.status(200).json({ success: true, message: "Successfully added new user profile.", data: newUser });
  } catch (e) { handleError("handleAddUserProfile", 400, e as Error, res); }
};

export const handleUpdateProfile = async (req: Request, res: Response) => {
  try {
    const { _id, name, email, phone } = req.body;
    const profile = await s3.uploadFile(req.file, _id);
    // do: check if files deleted successfully with result.Errors.length
    const newUser = await User.findByIdAndUpdate(_id, { $set: { profile, name, email, phone } }, { new: true });
    if (req.file && newUser) newUser.profile = s3.createImgSrc(req.file.mimetype as string, req.file.buffer as Buffer);
    res.status(200).json({ success: true, message: "Successfully updated user profile.", data: newUser });
  } catch (e) { handleError("handleUpdateProfile", 400, e as Error, res); }
};

export const handleRemoveProfiles = async (req: Request, res: Response) => {
  try {
    await s3.deleteFiles(req.body);
    // do: check if files deleted successfully with result.Errors.length
    await User.deleteMany({ _id: { $in: req.body } });
    res.status(200).json({ success: true, message: "Successfully removed user profiles." });
  } catch (e) { handleError("handleRemoveProfiles", 400, e as Error, res); }
};