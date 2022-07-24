import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();
const { handleGetUserProfiles, handleAddUserProfile, handleUpdateProfile, handleRemoveProfiles } = UserController;

router.get("/profiles", handleGetUserProfiles);
router.post("/profiles", handleAddUserProfile);
router.put("/profiles", handleUpdateProfile);
router.delete("/profiles", handleRemoveProfiles);

export default router;