import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();
const { handleGetUserProfiles, handleAddUserProfile, handleUpdateProfile, handleRemoveProfile } = UserController;

router.get("/profiles", handleGetUserProfiles);
router.post("/profiles", handleAddUserProfile);
router.put("/profiles", handleUpdateProfile);
router.delete("/profiles", handleRemoveProfile);

export default router;